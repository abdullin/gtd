/** @jsx React.DOM */

var React = require("react");
var Task = require("../lib/Task");
var StoreMixin = require("fluxible-app").StoreMixin;
var TaskStore = require("../stores/TaskStore");
var TaskCheck = require("./TaskCheck");
var TaskStar = require("./TaskStar");
// Stateful view
var TaskView = React.createClass({
	mixins: [StoreMixin],
	statics: {
		storeListeners: {
			_onChange: [TaskStore]
		}
	},
	_onChange: function() {
		this.setState(this.getStateFromStores());
	},
	getInitialState: function() {
		return this.getStateFromStores();
	},
	getStateFromStores: function() {
		var tasks = this.getStore(TaskStore);
		return {
			task : tasks.getTask(this.props.taskId)
		};
	},


	propTypes: {
		context: React.PropTypes.object.isRequired,
		taskId: React.PropTypes.string.isRequired
	},

	render: function render() {
		var task = this.state.task;
		var context = this.props.context;
		if (task === undefined) {
			return <div>Task not found</div>;
		}
		return (
			<div className="task-view">
				<header>
					<div className="task-view__check">
						<TaskCheck task={task} context={context} />
					</div>
					<div className="task-view__star">
						<TaskStar task={task} context={context} />
					</div>
					<div className="task-view__name">
						{task.name}
					</div>
				</header>

			</div>
		);
	}
});


module.exports = TaskView;
