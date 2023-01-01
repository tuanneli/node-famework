const EventEmitter = require('events');
const http = require('http');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router._endpoints).map(route => {
            const endpoint = router._endpoints[route];
            Object.keys(endpoint).map(method => {
                this.emitter.on(this._getRouteMask(route, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                })
            })
        })
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = "";
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => middleware(req, res));
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
                if (!emitted) {
                    res.end();
                }
            })
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}