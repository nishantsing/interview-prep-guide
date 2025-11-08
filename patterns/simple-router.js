/* 
Simple Router

Create a basic client-side router.
*/

class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = '';
    }
    navigate(route) {
        this.currentRoute = route;
        const handler = this.routes[route];
        if (handler) {
            handler();
        }
        else {
            console.log('404 - Not Found');
        }
    }
}

// Usage
const routes = {
    '/ ': () => console.log('Home'),
    '/about': () => console.log('About'),
};
const router = new Router(routes);
router.navigate('/'); // Home
router.navigate('/about'); // About
router.navigate('/contact'); // 404 - Not Found