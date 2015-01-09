/** @jsx React.DOM */

var React = require("react");
var Task = require("../lib/Task");

var uncheckTask = require("../actions/uncheckTask");
var checkTask = require("../actions/checkTask");

var Check = React.createClass({
	propTypes: {
		context: React.PropTypes.object.isRequired,
		task: Task.isRequired
	},

	_onUncheck: function() {
		var task = this.props.task;
		var context = this.props.context;
		context.executeAction(uncheckTask, {id : task.id});
	},

	_onCheck: function() {
		var task = this.props.task;
		var context = this.props.context;

		context.executeAction(checkTask, {id : task.id});
	},

	render: function render() {
		var task = this.props.task;
		var className = "task-check";
		if (task.flagged) {
			className += " task-check--flagged";
		}

		if (task.completed) {
			return (
				<svg width="48"
					 height="48"
					 viewBox="0 0 48 48"
					 className={className}
					 onClick={this._onUncheck}>
 <path d="M0 0h48v48H0z" fill="none"/>
	<path d="M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM20 34L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/>

				</svg>
			);
		} else {
			return (
				<svg width="48" height="48" viewBox="0 0 48 48" className={className}
					 onClick={this._onCheck}>
	<path d="M38 10v28H10V10h28m0-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z"/>
	<path d="M0 0h48v48H0z" fill="none"/>
				</svg>
			);
		}

	}
});


module.exports = Check;
