/** @jsx React.DOM */

var React = require("react");
var Task = require("../lib/Task");

var starTask = require("../actions/starTask");
var unstarTask = require("../actions/unstarTask");

var TaskStar = React.createClass({
	propTypes: {
		context: React.PropTypes.object.isRequired,
		task: Task.isRequired
	},

	_starTask: function() {
		var id = this.props.task.id;
		var context = this.props.context;
		context.executeAction(starTask, {id : id});
	},

	_unstarTask: function() {
		var id = this.props.task.id;
		var context = this.props.context;
		context.executeAction(unstarTask, {id : id});
	},

	outline: function() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg"
				 width="48"
				 height="48"
				 viewBox="0 0 24 24"
				 className="task-star"
				 onClick={this._starTask}>
				<path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		);
	},
	filled: function(){
		return (
			<svg xmlns="http://www.w3.org/2000/svg"
				 width="48"
				 height="48"
				 viewBox="0 0 24 24"
				 className="task-star task-star--flagged"
				 onClick={this._unstarTask}>
				<path d="M0 0h24v24H0z" fill="none"/>
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>

		);
	},


	render: function render() {
		var task = this.props.task;
		if (task.flagged) {
			return this.filled();
		} else {
			return this.outline();
		}
	}
});


module.exports = TaskStar;
