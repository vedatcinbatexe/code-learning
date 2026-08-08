export function combineReducers(reducerMap) {
    return function rootReducer(state = {}, action) {
        
        const nextState = []
        
        for(const key in reducerMap) {
            nextState[key] = reducerMap[key](state[key], action);
        }
        return nextState;
    }
}