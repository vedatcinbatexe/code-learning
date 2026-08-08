import { createStore } from "./createStore.js";
import { counterReducer } from './counterReducer.js';
import { applyMiddleware,logger, thunk } from "./middleware.js";

const baseStore = createStore(counterReducer, { count: 0 });
const store = applyMiddleware(baseStore, [thunk, logger]);

store.dispatch({ type: 'INCREMENT' });

function incrementAsync() {
    return (dispatch, getState) => {
        console.log('starting async increment, current state: ', getState());
        setTimeout(() => {
            dispatch({ type: 'INCREMENT' });
        }, 500);
    }
}

store.dispatch(incrementAsync());