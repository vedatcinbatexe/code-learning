/*
async function getData() {
    try {
        const result = await Promise.reject(new Error('failed'));
        console.log('never runs');
    }catch(err) {
        console.log('caught: ', err.message); // 'caught: failed'
    }
}

async function fetchAll() {
    try {
        const a = await fetchA();
        const b = await fetchB();
        const c = await fetchC();

        return [a, b, c];
    }catch(err) {
        console.log('one of them failed: ', err.message);
    }
}

async function fetchAllWithPromiseAll() {
    try {
        const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
        return [a, b, c];
    }catch(err) {
        console.log('at least one failed:', err.message); // only ONE error, others discarded
    }
} */
/*
Here, fetchA(), fetchB(), fetchC() all start executing immediately (calling an async function runs it up to its first await), 
and Promise.all just waits for all three. 
Much faster. But — fail-fast strikes again: if fetchB() rejects, 
you only get that one error in your catch, and you have no idea whether fetchA() or fetchC() also failed or succeeded, because Promise.all discards everything else the moment one rejects.
 
*/

async function fetchAll() {
    const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);

    const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'failed').map(r => r.reason);

    return { succeeded, failed };
}