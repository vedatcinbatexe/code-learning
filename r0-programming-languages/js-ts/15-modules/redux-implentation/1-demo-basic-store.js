import { createStore } from './createStore.js'
import { counterReducer } from './counterReducer.js';

const store = createStore(counterReducer, { count: 0 });

const unsubscribe = store.subscribe(() => {
    console.log('State changed: ', store.getState());
});

store.dispatch({ type: 'INCREMENT' }); // State changed: { count: 1}
store.dispatch({ type: 'INCREMENT' }); // State changed: { count: 2}
store.dispatch({ type: 'DECREMENT' }); // State changed: { count: 1}

unsubscribe();
store.dispatch({ type: 'INCREMENT' }); // nothing logged - unsubcribed

console.log('Final state: ', store.getState());
