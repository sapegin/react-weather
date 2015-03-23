// Author: Artem Sapegin http://sapegin.me, 2015

'use strict';

import Select from './select';

const MSECS_IN_MIN = 60000;

export default React.createClass({
	displayName: 'IntervalSelect',

	getDefaultProps: function() {
		return {
			items: {
				'30 sec': MSECS_IN_MIN / 2,
				'1 min': MSECS_IN_MIN,
				'5 min': 5 * MSECS_IN_MIN,
				'10 min': 10 * MSECS_IN_MIN
			}
		};
	},

	getValue: function() {
		return this.refs.select.getValue();
	},

	render: function() {
		return (
			<Select ref="select" items={this.props.items}/>
		);
	}
});
