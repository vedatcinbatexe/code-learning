export function applyMiddleware(store, middlewares) {
  let dispatch = store.dispatch;

  // each middleware gets a chance to wrap dispatch before the next one does
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action) => dispatch(action) // reference to the "current" dispatch
  };

  const chain = middlewares.map(middleware => middleware(middlewareAPI));

  // compose right-to-left: chain[0](chain[1](chain[2](store.dispatch)))
  dispatch = chain.reduceRight((next, middleware) => middleware(next), store.dispatch);

  return { ...store, dispatch };
}

// a logging middleware
export const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action); // call the next middleware (or the real dispatch)
  console.log('next state', store.getState());
  return result;
};

// a thunk middleware — lets you dispatch FUNCTIONS, not just objects
export const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState); // async logic lives here
  }
  return next(action);
};