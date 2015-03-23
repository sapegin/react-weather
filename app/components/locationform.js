// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import Block from 'bem-cn';
import LocationActions from '../actions/locationactions';
import IntervalSelect from './intervalselect';

let b = new Block('location-form');

export default React.createClass({
	displayName: 'LocationForm',

	_handleSubmit: function(event) {
		event.preventDefault();
		let element = this.refs.location.getDOMNode();
		let location = element.value.trim();
		if (!location) {
			return;
		}

		let interval = this.refs.interval.getValue();
		LocationActions.create(location, interval);
		element.value = '';
		element.focus();
	},

	render: function() {
		return (
			<form className={b} onSubmit={this._handleSubmit}>
				<input type="text" placeholder="Moscow, Russia" ref="location" className={b('field').mix('field')}/>
				<div className={b('interval')}>
					<IntervalSelect ref="interval"/>
				</div>
				<input type="submit" className={b('submit').mix('button')} value="Add"/>
			</form>
		);
	}
});
