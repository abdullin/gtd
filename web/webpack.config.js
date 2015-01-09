/*global __dirname */
"use strict";
//var webpack = require("webpack");
var path = require("path");

module.exports = {
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	entry: "./client.js",
	output: {
		path: path.join(__dirname, "build/js"),
		filename: "client.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style!css"
			},
			{
				test: /\.jsx$/,
				loader: "jsx-loader"
			}
		]
	},
	plugins: [
	// new webpack.optimize.UglifyJsPlugin()
	]
};
