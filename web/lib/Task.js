"use strict";



function Task() {
}

function getErrors(spec) {
	var errors = [];
	var keys = [
		"name", "id", "inbox", "addedDate",
		"completed",
		"flagged"
	];

	keys.forEach(function(k) {
		if (spec[k] === undefined) {
			errors.push("missing value for `" + k + "`");
		}
	});
	return errors;
}

Task.validate = function(spec) {
	var errors = getErrors(spec);
	if (errors.length > 0) {
		throw new Error("Errors: " + errors.slice(0, 5));
	}
};


Task.isRequired = function(props, name, component) {
	var value = props[name];
	var errors = getErrors(value);
	if (errors.length > 0) {
		var err = new Error("Prop `" + name + "` " + errors[0] + " in `" + component + "`.");
		return err;
	}
};


module.exports = Task;
