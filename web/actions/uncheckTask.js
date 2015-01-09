"use strict";
var debug = require("debug")("task/uncheck");
module.exports = function(context, payload, done) {
	context.service.update("tasks", {
		id: payload.id,
		completed: false
	}, {}, function(err) {
			if (err) {
				debug("Update failed", err);
				context.dispatch("TASK_UNCHECK_FAILED", err);
			} else {
				context.dispatch("event:TaskUnchecked", {
					id: payload.id
				});
			}
			done();
		});
};
