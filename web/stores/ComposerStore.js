"use strict";

var createStore = require("fluxible-app/utils/createStore");

var ComposerStore = createStore({
	storeName: "ComposerStore",
	handlers: {
		"event:ComposerChanged": "_changed",
		"event:ComposerFinished": "_finished"
	},
	_changed: function(e) {
		this[e.name] = e.value;
		this.emitChange();
	},
	_finished: function() {
		this.text = "";
		this.emitChange();
	},

	initialize: function() {
		//	this.items = [];
	},

	getItem: function() {
		return {
			text: this.text
		};
	},


	//getItems: function() {
	//	return this.items;
	//},
	dehydrate: function() {
		return {
			//		items: this.items
		};
	},
	rehydrate: function() {
		//	this.items = state.items;
	}
});


module.exports = ComposerStore;
