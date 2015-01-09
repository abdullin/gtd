/** @jsx React.DOM */

var React = require("react");

var TaskStore = require("../stores/TaskStore");
var AppStore = require("../stores/AppStore");
var StoreMixin = require("fluxible-app").StoreMixin;
var RouterMixin = require('flux-router-component').RouterMixin;
var debug = require("debug")("app");
var SideNav = require("./SideNav");
var ViewSelector = require("./ViewSelector");

var AppPage = React.createClass({
	mixins: [StoreMixin, RouterMixin],

	displayName : "AppPage",
	propTypes: {
		context: React.PropTypes.object.isRequired
	},
	statics: {
		storeListeners: {
			_onChange: [TaskStore, AppStore]
		}
	},
	getInitialState: function getInitialState() {
		return this.getStateFromStores();
	},

	getStateFromStores: function getStateFromStores() {
		// TODO - split sidebar?
		var itemStore = this.getStore(TaskStore);
		var appStore = this.getStore(AppStore);
		return {
			inboxCount: itemStore.getInboxCount(),
			starredIncompleteCount: itemStore.countStarredIncomplete(),
			// route is required by Router Mixin
			route: appStore.getRoute()
		};
	},

	_onChange: function() {
		this.setState(this.getStateFromStores());
	},


	render: function render() {
		var context = this.props.context;
		var page = this.state.route.name;
		var params = this.state.route.params;

		return (
			<div className="row">
				<div className="small-3 columns">
					<SideNav title="Agenda"
							 image="agenda"
							 context={context}
							 route="agenda" />
					<SideNav title="Inbox"
							 image="inbox"
							 count={this.state.inboxCount}
							 context={context}
							 route="inbox" />
					<SideNav title="Projects"
							 image="projects"
							 route="projects"
							 context={context} />
					<SideNav title="Contexts" image="contexts" />
					<SideNav title="Starred"
							 image="starred"
							 context={context}
							 count={this.state.starredIncompleteCount}
							 route="starred" />
				</div>
				<div className="small-9 columns">
					<ViewSelector context={context} page={page} params={params} />
				</div>
			</div>
		);
	}
});


module.exports = AppPage;
