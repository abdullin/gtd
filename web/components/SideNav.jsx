/** @jsx React.DOM */

var React = require("react");
var NavLink = require("flux-router-component").NavLink;

var map = {
	agenda: "agenda",
	inbox: "inbox",
	contexts: "label",
	projects: "folder",
	starred: "stars"
};

var SideNav = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		image: React.PropTypes.oneOf(["agenda", "inbox", "contexts", "projects", "starred"])
	},

	render: function render() {

		var image = "/images/" + map[this.props.image] +  "_24px.svg";

		var title = this.props.title;

		var count = this.props.count;
		if (count !== undefined && count > 0) {
			title += " (" + count +")";
		}

		return (
			<div className="side-nav">
				<NavLink routeName={this.props.route} context={this.props.context}>
					<img src={image} className="side-nav__svg" />
					<span className="side-nav__title">{title}</span>
				</NavLink>

			</div>

		);
	}
});


module.exports = SideNav;
