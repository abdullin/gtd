"use strict";
var debug = require("debug")("task/star");
module.exports = function(context, payload, done) {
	context.service.update("tasks", {
		id: payload.id,
		starred: true
	}, {}, function(err) {
			if (err) {
				debug("Update failed", err);
				context.dispatch("TASK_STAR_FAILED", err);
			} else {
				context.dispatch("event:TaskStarred", {
					id: payload.id
				});
			}
			done();
		});
};
