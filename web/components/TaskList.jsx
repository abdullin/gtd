/** @jsx React.DOM */

var React = require("react");

var TaskItem = require("./TaskItem");

var TaskList = React.createClass({
	propTypes: {
		tasks: React.PropTypes.array,
		context: React.PropTypes.object.isRequired
	},

	render: function render() {
		var items = [];
		var context = this.props.context;
		this.props.tasks.forEach(function (i) {
			items.push(
				<TaskItem key={i.id}
						   task={i}
						   context={context}
						   />);
		});

		return (
			<div className="inbox-list">
				{items}
			</div>
		);
	}
});
module.exports = TaskList;
