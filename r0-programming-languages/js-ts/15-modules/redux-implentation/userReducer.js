export function userReducer(state = { name: null, loggedIn: false}, action) {
    switch(action.type) {
        case 'LOGIN':
            return { ...state, name: action.payload, loggedIn: true };
        
        case 'LOGOUT':
            return { ...state, name: null, loggedIn: false };

        default:
            return state;
    }
}