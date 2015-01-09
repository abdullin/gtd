"use strict";

var createStore = require("fluxible-app/utils/createStore");

function ensure(obj, name) {
	if (obj === undefined) {
		throw new Error("Required non null " + name);
	}
}

var TaskStore = createStore({
	storeName: "TaskStore",

	handlers: {
		"event:TaskAdded": "taskAdded",
		"event:TasksLoaded": "tasksLoaded",
		"event:TaskChecked": "taskChecked",
		"event:TaskUnchecked": "taskUnchecked",
		"event:TaskStarred": "taskStarred",
		"event:TaskUnstarred": "taskUnstarred"
	},

	tasksLoaded: function(tasks) {
		var self = this;
		this.map = {};

		tasks.forEach(function(item) {
			if (item.inbox === true) {
				self.map[item.id] = item;
			}
		});
		this.emitChange();
	},
	taskAdded: function(task) {
		if (task.inbox) {
			this.map[task.id] = task;
			this.emitChange();
		}
	},
	taskChecked: function(task) {
		ensure(task.id, "task.id");
		var inbox = this.map[task.id];
		if (inbox === undefined || inbox.completed === true) {
			return;
		}
		inbox.completed = true;
		this.emitChange();
	},

	taskStarred: function(task) {
		ensure(task.id, "task.id");
		var subj = this.map[task.id];
		if (subj === undefined || subj.flagged === true) {
			return;
		}
		subj.flagged = true;
		this.emitChange();
	},
	taskUnstarred: function(task) {
		ensure(task.id, "task.id");
		var subj = this.map[task.id];
		if (subj === undefined || subj.flagged === false) {
			return;
		}
		subj.flagged = false;
		this.emitChange();
	},
	taskUnchecked: function(task) {
		ensure(task.id, "task.id");
		var subj = this.map[task.id];
		if (subj === undefined || subj.completed === false) {
			return;
		}
		subj.completed = false;
		this.emitChange();
	},
	initialize: function() {
		this.map = {};
	},

	getInbox: function() {
		var items = [];
		var map = this.map;
		Object.keys(this.map).forEach(function(k) {
			items.push(map[k]);
		});

		items.sort(function(a, b) {
			return a.order - b.order;
		});
		return items;
	},
	getAgenda: function() {
		var map = this.map;
		var items = [];
		Object.keys(map).forEach(function(k) {
			var item = map[k];
			if (item.completed === false && item.flagged === true) {
				items.push(item);
			}
		});

		Object.keys(map).forEach(function(k) {
			var item = map[k];
			if (item.completed === false && item.flagged === false) {
				items.push(item);
			}
		});
		return items;
	},
	getTask: function(taskId) {
		return this.map[taskId];
	},

	getInboxCount: function() {
		var map = this.map;
		var count = 0;
		Object.keys(this.map).forEach(function(k) {
			if (map[k].completed === false) {
				count += 1;
			}
		});

		return count;
	},
	countStarredIncomplete: function() {
		var map = this.map;
		var count = 0;
		Object.keys(map).forEach(function(k) {
			var item = map[k];
			if (item.flagged === true && item.completed !== true) {
				count += 1;
			}
		});
		return count;
	},

	//getItems: function() {
	//	return this.items;
	//},
	dehydrate: function() {
		return {
			map: this.map
		};
	},
	rehydrate: function(state) {
		this.map = state.map;
	}
});

module.exports = TaskStore;
