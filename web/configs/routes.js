"use strict";

var nothing = function(context, payload, done) {
	done();
};

module.exports = {
	inbox: {
		path: "/",
		method: "get",
		page: "inbox",
		action: nothing
	},
	starred: {
		path: "/starred",
		method: "get",
		page: "starred",
		action: nothing
	},
	agenda: {
		path: "/agenda",
		method: "get",
		page: "agenda",
		action: nothing
	},
	task: {
		path: "/task/:taskId",
		method: "get",
		page: "task",
		action: nothing
	},
	context: {
		path: "/context/:id",
		method: "get",
		page: "context",
		action: function(context, payload, done) {
			context.dispatch("LOAD_CONTEXT", {
				id: payload.params.id
			});
			done();
		}
	}
};
