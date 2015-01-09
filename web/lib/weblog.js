"use strict";

//var debug = require("debug")("app:web");

module.exports = function(req, res, next) {
	var identity = "";
	if (req.session && req.session.login) {
		identity = req.session.login;
	}

	console.log(req.method, req.url, identity, req.body || "<no body>");
	next();
};
