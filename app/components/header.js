// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import moment from 'moment';

export default React.createClass({
	displayName: 'Header',

	weekdays: [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	],

	render: function() {
		let weekday = this.weekdays[moment().weekday()];
		let date = moment().format('MMMM D');
		return (
			<header className="header">{weekday}, {date}</header>
		);
	}
});
