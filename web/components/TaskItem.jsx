/** @jsx React.DOM */

var React = require("react");
var Task = require("../lib/Task");
var TaskCheck = require("./TaskCheck");
var NavLink = require("flux-router-component").NavLink;


var TaskItem = React.createClass({
	propTypes: {
		context: React.PropTypes.object.isRequired,
		task: Task.isRequired
	},

	_onClick: function() {

	},


	render: function render() {
		var task = this.props.task;
		var context = this.props.context;
		var clazz = "task-item";
		if (task.completed) {
			clazz += " task-item--completed";
		}
		var path = context.makePath("task", {taskId: task.id});

		return (
			<div className={clazz} >
				<div className="task-item__check" onClick={this._onCheck}>
					<TaskCheck task={task} context={this.props.context} />
				</div>
				<div className="task-item__name">
					<NavLink context={context} href={path}>
						{task.name}
					</NavLink>
				</div>


			</div>
		);
	}
});


module.exports = TaskItem;
