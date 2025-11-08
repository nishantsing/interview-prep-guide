/* 
Middleware

Create a simple middleware function to log actions in a store.
*/

function loggerMiddleware(store) {
    const originalDispatch = store.dispatch;
    store.dispatch = function (action) {
        console.log('Dispatching action:', action);
        originalDispatch.call(store, action);
    };
}
// Usage
const store = {
    state: {},
    dispatch(action) {
        console.log('Action dispatched:', action);
    }
};
loggerMiddleware(store);
store.dispatch({ type: 'ADD_ITEM' }); // Dispatching action: { type: 'ADD_ITEM' }