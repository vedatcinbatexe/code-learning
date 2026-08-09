// 1. Forgetting await - the 'silent promise' bug
async function saveUser() {
    db.save(user); // BUG: missing await
    console.log('saved');
}

// db.save(user) returns promise, but without "await", the function
// doesn't wait for it
// Worse: if db.save rejects, that rejection becomes an "unhandled promise rejection" - no catch
// anywhere is watching it, and depending on your Node version, this can silently fail or crash the process

// 2. async inside .forEach() - doesn't do what you think
async function processalL(items) {
    items.forEach(async (item) => {
        await processItem(item);
    });
    console.log('all done'); // BUG: logs before any item finishes
}

// fix if you want sequential processing:
async function processAll(items) {
    for (const item of items) {
        await processAll(item); // for..of DOES respect await properly
    }
    console.log('all done')
}

// fix if you want parallel processing but still want to wait for completion
async function processAll(items) {
    await Promise.all(items.map((item) => processItem(item)));
    console.log('all done')
}

// 3. Unnecessary sequential await
async function getDashboardData(userId) {
    const profile = await fetchProfile(userId); // waits 200ms
    const orders = await fetchOrders(userId); // then waits another 300ms
    const settings = await fetchSettings(userId); // then waits another 150ms
    return { profile, orders, settings };
}

// Three calls don't depend on each other at all, but writing them with sequential await forces
// them to run one after another -- total time 650ms.

async function getDashboardPage(userId) {
    const [profile, orders, settings] = await Promise.all([
        fetchProfile(userId),
        fetchOrders(userId),
        fetchSettings(userId)
    ]);

    return { profile, orders, settings };
}

// Swallowing erros by forgetting try/catch at the right layer
async function getUser(id) {
    const user = await db.findUser(id); // if this rejects, getUser() rejects
    return user;
}

// Caller
function handleRequest(id) {
    getUser(id).then((user) => res.json(user));
    // BUG: no .catch() - a rejection here is unhandled
}

// 5. Race conditions from shared mutable state
let cache = null;

async function getConfig() {
    if (cache) return cache;
    cache = await fetchConfig();
    return cache;
}

// If called twice rapidly, BEFORE the first await resolves
getConfig(); // cache is still null, starts fetchConfig()
getConfig(); // cache is STILL null (first call hasn't finished), starts fetchConfig() AGAIN

let cachePromise = null;

async function getConfig() {
    if(!cachePromise) {
        cachePromise = fetchConfig(); // store the PROMISE immediately, synchronously
    }
    return cachePromise; // second caller awaits the SAME in-flight promise
}

// 6. Closures capturing loop variables with var (Day 1 concept resurfacing)
async function processQueue() {
  for (var i = 0; i < 3; i++) {
    setTimeout(async () => {
      const result = await processItem(i);
      console.log(`item ${i}: done`); // BUG: logs "item 3" three times
    }, 100);
  }
}

// 7. Mixing callback-style APIs with promises without converting properly
function getUserOldStyle(id, callback) { /* old Node-style callback API */ }

async function getUser(id) {
  const user = getUserOldStyle(id, (err, result) => {
    if (err) throw err; // BUG: this throw does NOTHING useful here
    return result;
  });
  return user; // returns undefined immediately — getUserOldStyle hasn't finished
}

// Fix — wrap it (promisify) before using it in async/await code:
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    getUserOldStyle(id, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function getUser(id) {
  return await getUserPromise(id); // now this actually works
}