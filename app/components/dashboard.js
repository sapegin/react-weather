// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import Block from 'bem-cn';
import WeatherWidget from './weatherwidget';

let b = new Block('dashboard');

export default React.createClass({
	displayName: 'Dashboard',
	propTypes: {
		locations: React.PropTypes.array.isRequired
	},

	render: function() {
		let locations = this.props.locations;
		let widgets;
		if (locations.length) {
			widgets = locations.map(function(location) {
				return (
					<WeatherWidget key={location.id} location={location}/>
				);
			});
		}
		else {
			widgets = (
				<div className={b('placeholder')}>Add the first location below ↓</div>
			);
		}
		return (
			<div className={b}>
				{widgets}
			</div>
		);
	}
});
