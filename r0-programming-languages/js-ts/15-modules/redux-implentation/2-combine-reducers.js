import { createStore } from './createStore.js';
import { combineReducers } from './combineReducers.js';
import { counterReducer } from './counterReducer.js';
import { userReducer } from './userReducer.js';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

const store = createStore(rootReducer, undefined);

store.subscribe(() => {
    console.log('State changed: ', store.getState());
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'LOGIN ', payload: 'Vedat' });

console.log('Final state: ', store.getState())