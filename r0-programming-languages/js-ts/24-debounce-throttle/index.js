/*
    Debounce & Throttle
        - Both are techniques for controlling how often a function runs in a response
        to rapidly-firing event (scroll, resize, keystoke, mouse move)

        - They solve the same class of problem - "this first too often, and it's expensive"
        -- but with fundamentally different strategies, and mixing up is a classic interview
        mistake


    * Debounce *
        - The idea: wait until the event stops firing for a special period,
        then run the function exactly once.
        - Every new call resets the timer.
        - If the event keeps firing before the delay elapses, the function
        never runs -- only once thing go quiet does it finally execute

        - Real-world use case: a search input where you don't want to fire
        an API request on every keystroke - you want to wait until the user 
        actually pauses typing


*/

function debounce(fn, delayMs) {
  let timeoutId = null;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delayMs);
  };
}

/*
        - Walk through the mechanics: debounce() is a "higher-order function" -- it takes
        your real function fn and returns a new wrapper function
        - That wrapper closes over "timeoutId"
        - Every time the wrapper is called, it cancels whatever timeout was pending and schedules
        a brand new one
        - Only if "delayMs" passes with no new calls does the scheduled "setTimeout" actually fire and call fn


*/

const debouncedSearch = debounce((query) => {
  console.log("Searching for: ", query);
}, 300);

debouncedSearch("c");
debouncedSearch("ca");
debouncedSearch("cat");
// Only ONE search actually fires: "Searching for: cat"
// Assuming these three calls happen within 300ms of each other

// Each call cancels the previous pending timer and restarts the clock
// If the user typing faster than 300ms between keystokes, the function never fires
// at all -- until they finally pause

/*
    Throttle
        - The idea: run the function immediately, then ignore furher calls until a cooldown
        period has passed - guarenteeing the function runs at most once every N milliseconds, no matter
        how often the evet fires

        - Real-world use case: a scroll handler that updates a "scroll progress" bar -- you dont
        need to update it on literally every pixel of scroll, but you also don't want to wait for scrolling to stop (unlike debounce)
        you want steady, periodic updates while it's happening

*/

function throttle(fn, intervalMs) {
  let isThrottled = false;

  return function (...args) {
    if (isThrottled) return; // ignore calls during the cooldown

    fn.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false; // cooldown over, next call is allowed through
    }, intervalMs);
  };
}

const throttledScroll = throttle(() => {
  console.log("Scroll position updated");
}, 1000);

// simulating rapid-fire scroll events, one every 100ms for 3 seconds:
// call at 0ms    -> runs immediately, "scroll position updated"
// call at 100ms  -> ignored (still in cooldown)
// call at 200ms  -> ignored
// ... (ignored through 900ms)
// call at 1000ms -> cooldown just expired, runs again
// ... pattern repeats

/*
    * The core distinction, side by side
                    Debounce                                        Throttle
    o Fires         Once, after the event goes quiet                Repeatedly, at a fixed max rate
    o Trailing      Reset the timer, delay execution further        Ignored during cooldown
    calls
    o Guarantee     Run once things settle down                     Run at most once per interval, consistently
    o Good for      Search-as-you-type, form validation,            Scroll handlers, mouse-move tracking, rate-limited API polling 
                    resize-end


    A useful mental shortcut: debounce is about waiting for silence; throttle is about enforcing a steady drip.

*/

function debounceLeading(fn, delayMs) {
  let timeoutId = null;

  return function (...args) {
    const canRunNow = !timeoutId;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delayMs);

    if (canRunNow) fn.apply(this, args);
  };
}
