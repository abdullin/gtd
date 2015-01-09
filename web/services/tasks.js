"use strict";

var tasks = {};
var debug = require("debug")("tasks/service");

function asArray() {
	return Object.keys(tasks).map(function(key) {
		return tasks[key];
	});
}

module.exports = {
	name: "tasks",
	read: function(req, resource, params, config, callback) {
		callback(undefined, asArray());
	},
	create: function(req, resource, params, body, config, callback) {
		var item = {
			id: params.id,
			name: params.name,
			inbox: true,
			addedDate: new Date(),
			completed: false,
			flagged: false
		};
		tasks[item.id] = item;



		callback(undefined, item);
	},
	update: function(req, resource, params, body, config, callback) {
		debug("Update called");
		if (params.id === undefined) {
			callback("ID must be specified");
			return;
		}
		var task = tasks[params.id];
		if (task === undefined) {
			debug("Task doesn't exist", params.id);
			callback("Task doesn't exist " + params.id);
			return;
		}
		if (params.completed !== undefined) {
			task.completed = params.completed;
		}
		callback(undefined, task);
	}
	//delete: function(req, resource, params, config, callback) {}
};
