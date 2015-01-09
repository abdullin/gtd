/** @jsx React.DOM */

var TaskComposer = require("./TaskComposer");
var TaskList = require("./TaskList");
var React = require("react");
var TaskStore = require("../stores/TaskStore");
var StoreMixin = require("fluxible-app").StoreMixin;


var InboxView = React.createClass({
	mixins: [StoreMixin],
	propTypes: {
		context: React.PropTypes.object.isRequired
	},
	statics: {
		storeListeners: {
			_onChange: [TaskStore]
		}
	},
	getInitialState: function getInitialState() {
		return this.getStateFromStores();
	},
	getStateFromStores: function getStateFromStores() {
		var store = this.getStore(TaskStore);
		return {
			inbox: store.getInbox(),
			count: store.getInboxCount()
		};
	},

	_onChange: function() {
		this.setState(this.getStateFromStores());
	},

	render: function render() {
		var tasks = this.state.inbox;
		var context = this.props.context;
		return (
			<div>
				<h1>Inbox ({this.state.count})</h1>
				<TaskList tasks={tasks} context={context} />
				<TaskComposer context={context} inbox={true} />
			</div>
		);
	}
});


module.exports = InboxView;
