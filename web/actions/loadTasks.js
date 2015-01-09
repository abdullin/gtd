"use strict";
var debug = require("debug")("loadInbox");
module.exports = function(context, payload, done) {
	debug("Running");
	context.service.read("tasks", {}, {}, function(err, items) {
		if (err) {
			context.dispatch("event:LoadTasksFailed", err);
			done();
			return;
		}
		context.dispatch("event:TasksLoaded", items);
		done();
	});
};
