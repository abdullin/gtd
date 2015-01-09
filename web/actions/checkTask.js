"use strict";
var debug = require("debug")("task/check");
module.exports = function(context, payload, done) {
	context.service.update("tasks", {
		id: payload.id,
		completed: true
	}, {}, function(err) {
			if (err) {
				debug("Update failed", err);
				context.dispatch("TASK_CHECK_FAILED", err);
			} else {
				context.dispatch("event:TaskChecked", {
					id: payload.id
				});
			}
			done();
		});
};
