module.exports = class Router {
    constructor() {
        this._endpoints = {};
    }

    _request(method = 'GET', route, handler) {
        if (!this._endpoints[route]) {
            this._endpoints[route] = {};
        }
        const endpoint = this._endpoints[route];

        if (endpoint[method]) {
            throw new Error(`Method ${method} on address ${route} already exists`);
        }

        endpoint[method] = handler;
    }

    get(route, handler) {
        this._request('GET', route, handler);
    }

    post(route, handler) {
        this._request('POST', route, handler);
    }

    put(route, handler) {
        this._request('PUT', route, handler);
    }

    delete(route, handler) {
        this._request('DELETE', route, handler);
    }
}