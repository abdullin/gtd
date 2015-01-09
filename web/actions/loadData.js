"use strict";

var loadTasks = require("./loadTasks");
var SyncStore = require("../stores/SyncStore");
var debug = require("debug")("loadData");

module.exports = function(context, payload, done) {
	var store = context.getStore(SyncStore);
	if (store.wasDataLoaded()) {
		debug("data was already loaded");
		done();
		return;
	}

	context.executeAction(loadTasks, {}, function(err) {
		if (err !== undefined) {
			debug("Failed to load data");
		} else {
			context.dispatch("DATA_LOADED");
		}
		done();
	});

};
