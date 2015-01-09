"use strict";

var createStore = require("fluxible-app/utils/createStore");

var SyncStore = createStore({
	storeName: "SyncStore",

	handlers: {
		"DATA_LOADED": "whenDataLoaded"
	},
	whenDataLoaded: function() {
		this.dataLoaded = true;
	},
	initialize: function() {
		this.dataLoaded = false;
	},
	wasDataLoaded: function() {
		return this.dataLoaded;
	},
	dehydrate: function() {
		return {
			dataLoaded: this.dataLoaded
		};
	},
	rehydrate: function(state) {
		this.dataLoaded = state.dataLoaded;
	}
});

module.exports = SyncStore;
