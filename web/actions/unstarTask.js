"use strict";
var debug = require("debug")("task/unstar");
module.exports = function(context, payload, done) {
	context.service.update("tasks", {
		id: payload.id,
		starred: true
	}, {}, function(err) {
			if (err) {
				debug("Update failed", err);
				context.dispatch("TASK_UNSTAR_FAILED", err);
			} else {
				context.dispatch("event:TaskUnstarred", {
					id: payload.id
				});
			}
			done();
		});
};
