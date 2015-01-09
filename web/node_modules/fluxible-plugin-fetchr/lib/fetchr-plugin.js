/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Touchdown:FetchrPlugin');
var DEFAULT_API_PATH = '/api';
var Fetchr = require('fetchr');

/**
 * Collects metadata from the service calls so that they can be used for response headers
 * @param service
 * @param operation
 * @param metaArray
 * @returns {Function} The proxy method
 */
function crudProxy(service, operation, metaArray) {
    return function crudProxyMethod() {
        debug('service proxy');

        var args = Array.prototype.slice.call(arguments);
        // replace last argument (callback) with proxy callback
        // this is because 'config' is an optional param for services
        // thus ensuring the proxy callback is always passed in
        var callback = args.pop();
        // create proxy callback to add service meta to the context instance
        var proxyCallback = function (err, data, meta) {
            debug('service proxy callback', meta);
            if (meta) {
                metaArray.push(meta);
            }
            callback.apply(null, arguments);
        };

        args.push(proxyCallback);

        // execute service as usual
        service[operation].apply(service, args);
    };
}

/**
 * Creates a new fetchr plugin instance with options
 * @param {Object} options
 * @param {String} options.xhrPath The path to serve XHR requests from
 * @returns {FetchrPlugin}
 */
module.exports = function fetchrPlugin(options) {
    options = options || {};
    var xhrPath = options.xhrPath || DEFAULT_API_PATH;

    /**
     * @class FetchrPlugin
     */
    return {
        /**
         * @property {String} name Name of the plugin
         */
        name: 'FetchrPlugin',
        /**
         * Called to plug the FluxContext
         * @method plugContext
         * @param {Object} contextOptions options passed to the createContext method
         * @param {Object} contextOptions.req The server request object (only supplied if on server)
         * @param {Object} contextOptions.xhrContext Context object that will be used for all
         *      XHR calls from the client. This allows persistence of some values between requests
         *      and also CSRF validation. (e.g. { _csrf: 'a3fc2f', device: "tablet" })
         * @returns {Object}
         */
        plugContext: function plugContext(contextOptions) {
            var xhrContext = contextOptions.xhrContext;
            return {
                /**
                 * Adds the service CRUD and getServiceMeta methods to the action context
                 * @param actionContext
                 */
                plugActionContext: function plugActionContext(actionContext) {
                    var serviceMeta = [];
                    var service = new Fetchr({
                        req: contextOptions.req,
                        xhrPath: xhrPath,
                        context: xhrContext
                    });
                    actionContext.service = {
                        create: crudProxy(service, 'create', serviceMeta),
                        read: crudProxy(service, 'read', serviceMeta),
                        update: crudProxy(service, 'update', serviceMeta),
                        'delete': crudProxy(service, 'delete', serviceMeta)
                    };
                    actionContext.getServiceMeta = function getServiceMeta() {
                        return serviceMeta;
                    };
                },
                /**
                 * Called to dehydrate plugin options
                 * @method dehydrate
                 * @returns {Object}
                 */
                dehydrate: function dehydrate() {
                    return {
                        xhrContext: contextOptions.xhrContext
                    };
                },
                /**
                 * Called to rehydrate plugin options
                 * @method rehydrate
                 * @returns {Object}
                 */
                rehydrate: function rehydrate(state) {
                    xhrContext = state.xhrContext;
                }
            };
        },
        /**
         * Called to dehydrate plugin options
         * @method dehydrate
         * @returns {Object}
         */
        dehydrate: function dehydrate() {
            return {
                xhrPath: xhrPath
            };
        },
        /**
         * Called to rehydrate plugin options
         * @method rehydrate
         * @returns {Object}
         */
        rehydrate: function rehydrate(state) {
            xhrPath = state.xhrPath;
        },
        /**
         * Registers a service to the manager
         * @method registerService
         */
        registerService: function registerService(service) {
            Fetchr.registerFetcher(service);
        },
        /**
         * Get the express middleware. Only works on the server!
         * @method getMiddleware
         * @returns {Function}
         */
        getMiddleware: function () {
            return Fetchr.middleware();
        },
        /**
         * Provides access to the xhr path being used by the plugin
         * @method getXhrPath
         * @returns {String}
         */
        getXhrPath: function getXhrPath() {
            return xhrPath;
        }
    };
};
