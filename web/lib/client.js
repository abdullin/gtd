"use strict";


var api = "http://localhost:8001";
var request = require("request");


var post = function(options, callback) {
	if (options.uri === undefined) {
		throw new Error("uri must be defined");
	}

	var uri = api + options.uri;
	request.post({
		uri: uri,
		qs: options.qs,
		form: options.form
	}, function(error, response, body) {
			if (error) {
				callback(error);
				return;
			}
			var parsed = JSON.parse(body);
			if (parsed.error) {
				callback(parsed.error);
				return;
			}
			callback(undefined, parsed);
		});
};

module.exports = {
	post: post
};
