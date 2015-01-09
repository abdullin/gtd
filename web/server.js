"use strict";
require("node-jsx").install({
	extension: ".jsx"
});
var express = require("express");
var path = require("path");

var React = require("react");

var bodyParser = require("body-parser");
var navigateAction = require("flux-router-component").navigateAction;
var loadData = require("./actions/loadData");


var HtmlComponent = React.createFactory(require("./components/Html.jsx"));

var expressState = require("express-state");
var weblog = require("./lib/weblog");
var app = require("./app");
var debug = require("debug")("server");
var server = express();

expressState.extend(server);

server.use(weblog);
server.use("/public", express.static(path.join(__dirname, "build")));

server.use("/css", express.static(path.join(__dirname, "css")));
server.use("/images", express.static(path.join(__dirname, "images")));
server.use(bodyParser.json());



// Get access to the fetchr plugin instance
var services = app.getPlugin("FetchrPlugin");
// register available services
services.registerService(require("./services/tasks"));
// Set up the fetchr middleware
server.use(services.getXhrPath(), services.getMiddleware());


function handleError(err, next) {
	if (err.status && err.status === 404) {
		next();
	} else {
		next(err);
	}
}
server.use(function(req, res, next) {
	var context = app.createContext();
	var ac = context.getActionContext();
	debug("Executing navigate action");


	ac.executeAction(loadData, {
		force: true
	}, function(err) {
			if (err) {
				handleError(err, next);
				return;
			}

			ac.executeAction(navigateAction, {
				url: req.url
			}, function(err) {
					if (err) {
						handleError(err, next);
						return;
					}
					debug("Exposing context state");
					res.expose(app.dehydrate(context), "App");

					debug("Rendering Application component into html");
					var AppComponent = app.getAppComponent();
					var html = React.renderToStaticMarkup(HtmlComponent({
						state: res.locals.state,
						context: context.getComponentContext(),
						markup: React.renderToString(AppComponent({
							context: context.getComponentContext()
						}))
					}));

					debug("Sending markup");
					res.write(html);
					res.end();

				});

		});


});


var port = process.env.PORT || 3000;
server.listen(port);
console.log("Listening on port " + port);
