/** @jsx React.DOM */

var React = require("react");
var InboxView = require("./InboxView");
var TaskView = require("./TaskView");
var AgendaView = require("./AgendaView");
var ViewSelector = React.createClass({
	propTypes: {
		context: React.PropTypes.object.isRequired,
		page: React.PropTypes.string.isRequired,

	},

	loadView: function(page) {
		var context = this.props.context;
		if (page === "inbox") {
			return <InboxView context={context} />;
		}
		if (page === "agenda") {
			return <AgendaView context={context}/>;
		}
		if (page === "task") {
			var taskId = this.props.params.taskId;
			if (taskId === undefined) {
				throw new Error("Task Id must be specified");
			}
			return <TaskView context={context} taskId={taskId}/>;
		}
		return (<div>{page}</div>);
	},

	render: function render() {
		var view = this.loadView(this.props.page);
		return view;
	}
});


module.exports = ViewSelector;
