/** @jsx React.DOM */

var React = require("react");

var TaskList = require("./TaskList");
var React = require("react");
var TaskStore = require("../stores/TaskStore");
var StoreMixin = require("fluxible-app").StoreMixin;

var AgendaView = React.createClass({


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
			agenda: store.getAgenda()
		};
	},
	_onChange: function() {
		this.setState(this.getStateFromStores());
	},


	render: function render() {
		var tasks = this.state.agenda;
		var context = this.props.context;
		return (
			<div>
				<h1>Agenda</h1>
				<TaskList tasks={tasks} context={context} />
			</div>
		);
	}
});


module.exports = AgendaView;
