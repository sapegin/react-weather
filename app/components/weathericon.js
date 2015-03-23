// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

export default React.createClass({
	displayName: 'WeatherIcon',
	propTypes: {
		icon: React.PropTypes.string.isRequired
	},

	render: function() {
		let src = `icons/sw-${this.props.icon}.svg`;
		return (
			<img className="weather-icon" src={src} alt=""/>
		);
	}
});
