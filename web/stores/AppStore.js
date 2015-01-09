"use strict";

var createStore = require("fluxible-app/utils/createStore");
var routes = require("../configs/routes");
var debug = require("debug")("AppStore");
var AppStore = createStore({
	storeName: "AppStore",

	handlers: {
		"CHANGE_ROUTE_SUCCESS": "routeChanged"
		// "inventory__added": "inventoryAdded"
	},
	routeChanged: function(route) {
		debug(route);
		this.route = route;
		this.emitChange();
	},
	initialize: function() {
		this.routes = routes;
		this.route = undefined;
	},

	getRoute: function() {
		return this.route;
	},
	dehydrate: function() {
		return {
			route: this.route
		};
	},
	rehydrate: function(state) {
		this.route = state.route;
	}
});

module.exports = AppStore;
