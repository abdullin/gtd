"use strict";


var Task = require("./Task");

function SyncMagic() {
}
var first = function(arr) {
	if (arr !== undefined) {
		return arr[0];
	}
	return undefined;
};

SyncMagic.prototype.handleTask = function(t) {

	var completedDate = first(t.completed);

	var spec = {
		id: t.$.id,
		name: t.name[0],
		addedDate: t.added[0],
		modifiedDate: first(t.modified),
		order: first(t.order),

		completed: completedDate !== undefined,
		completedDate: completedDate,

		startDate: first(t.start),
		flagged: first(t.flagged) || false,
		rank: first(t.rank),
		inbox: first(t.inbox) !== undefined
	};

	var parentTask = first(t.task);
	if (parentTask !== undefined) {
		spec.task = parentTask.$.idref;
	}

	Task.validate(spec);


	if (spec.inbox === true) {
		this.callback("event:TaskAddedToInbox", spec);
	} else {
		this.callback("event:TaskCreated", spec);
	}
};

SyncMagic.create = function(callback) {
	var magic = new SyncMagic();
	magic.callback = callback;
	return magic;
};



module.exports = SyncMagic;
