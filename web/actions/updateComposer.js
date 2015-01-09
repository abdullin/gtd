"use strict";

module.exports = function(context, payload, done) {
	context.dispatch("event:ComposerChanged", payload);
	done();
};
