"use strict";
var React = require("react");
var FluxibleApp = require("fluxible-app");

var routrPlugin = require("fluxible-plugin-routr");
var fetchrPlugin = require("fluxible-plugin-fetchr");

var AppPage = require("./components/AppPage.jsx");

var app = new FluxibleApp({
	appComponent: React.createFactory(AppPage)
});

app.plug(fetchrPlugin({
	xhrPath: "/api"
}));

app.plug(routrPlugin({
	routes: require("./configs/routes")
}));

app.registerStore(require("./stores/ComposerStore"));
app.registerStore(require("./stores/TaskStore"));
app.registerStore(require("./stores/AppStore"));
app.registerStore(require("./stores/SyncStore"));

module.exports = app;
