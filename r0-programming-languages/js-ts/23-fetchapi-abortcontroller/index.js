async function getUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`);

    if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

const controller = new AbortController();
const { signal } = controller;

fetch('https://api.example.com/slow-endpoint', {signal})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
        if(err.name === 'AbortError') {
            console.log('Request was cancelled.');
        }else {
            console.log('Some other error: ', err.message);
        }
    });

controller.abort();

/*
When controller.abort() is called, the pending fetch() promise rejects with an error whose name is 'AbortError' — that's how 
you distinguish "I cancelled this on purpose" from "this actually failed." 
*/


// Common real pattern - manual timeout using AbortController:

async function fetchWithTimeout(url, timeoutMs) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); // request finished in time, cancel the timeout itself
        return response;
    }catch(err) {
        if(err.name == 'AbortError') {
            throw new Error(`Request timed out after ${timeoutMs}ms`);
        }
        throw err; // some other real network error, re-throw as-is
    }
}

// The search-as-you-type cancellation pattern

let currentController = null;

async function search(query) {
    // CANCEL the PREVIOUS in-flight request before starting a new one
    if(currentController) {
        currentController.abort();
    }

    currentController = new AbortController();

    try {
        const response = await fetch(`/api/search?q=${query}`, {
            signal: currentController.signal,
        });
        return await response.json();
    }catch(err) {
        if(err.name === 'AbortController') {
            return null; // this request was superseded by a newer one - not a real error
        }
        throw err;
    }
}
/*
This solves a real race condition: without cancellation, if you type "cat" 
then quickly "dog", both requests fire, and if the "cat" 
response happens to arrive after the "dog" response (out-of-order network timing), y
you'd overwrite the correct "dog" results with stale "cat" results. 
Aborting the stale request prevents that. */