/** @jsx React.DOM */

var React = require("react");
var ENTER_KEY_CODE = 13;
var updateComposer = require("../actions/updateComposer");
var addTask = require("../actions/addTask");

var StoreMixin = require("fluxible-app").StoreMixin;
var ComposerStore = require("../stores/ComposerStore");

var TaskComposer = React.createClass({
	mixins: [StoreMixin],
	propTypes: {
		context: React.PropTypes.object.isRequired,
		inbox: React.PropTypes.bool.isRequired
	},

	statics: {
		storeListeners: {
			_onChange: [ComposerStore]
		}
	},


	_onChange: function() {
		this.setState(this.getStateFromStores());
	},
	_fieldChanged: function(event) {
		var data = {
			name: event.target.name,
			value: event.target.value
		};
		this.props.context.executeAction(updateComposer, data);
	},

	getStateFromStores: function() {
		return this.getStore(ComposerStore).getItem();
	},

	getInitialState: function getInitialState() {
		return this.getStateFromStores();
	},

	_okClicked: function(event) {
		var item = {
			name: this.state.text,
			inbox: this.props.inbox
		};
		this.props.context.executeAction(addTask,item);
	},

	_keyPressed : function(event) {
		if (event.keyCode === ENTER_KEY_CODE) {
			this._okClicked(event);
		}
	},

	render: function render() {
		return (
			<div>
				<input type="text"
					   placeholder="Text"
					   name="text"
					   value={this.state.text}
					   onChange={this._fieldChanged}
					   onKeyDown={this._keyPressed}
					   />
			</div>

		);
	}
});


module.exports = TaskComposer;
