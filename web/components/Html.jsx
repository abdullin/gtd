/** @jsx React.DOM */

var React = require("react");

var Html = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		markup: React.PropTypes.string.isRequired,
		state: React.PropTypes.object.isRequired
	},

	render: function render() {
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>{this.props.title}</title>
					<meta name="viewport" content="width=device-width, user-scalable=no" />
					<link rel="stylesheet" href="/css/foundation.css" />
					<link rel="stylesheet" href="/css/base.css" />
				</head>
				<body>
				<div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
			</body>
			<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
			<script src="/public/js/client.js" defer></script>
			</html>
		);
	}
});


module.exports = Html;
