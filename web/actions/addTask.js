"use strict";

//var Task = require("../lib/Task");
var debug = require("debug")("addTask");
module.exports = function(context, payload, done) {
	context.dispatch("event:ComposerFinished", payload);

	var task = {
		id: "task-" + Math.random(),
		name: payload.name,
		inbox: payload.inbox
		//addedDate: new Date(),
		//completed: false,
		//flagged: false
	};


	context.service.create("tasks", task, {}, function(err, result) {
		if (err) {
			debug("inbox.create error", err);
			done();
			return;
		}
		debug("inbox.create OK", result);

		context.dispatch("event:TaskAdded", result);
		done();
	});
	//Task.validate(task);

	//var item = Task.create(payload);
	// todo - perform server post
	//context.dispatch("event:TaskAdded", task);
	//done();
};
