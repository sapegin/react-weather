// Author: Artem Sapegin http://sapegin.me, 2015

'use strict';

import Block from 'bem-cn';

let b = new Block('select');

export default React.createClass({
	displayName: 'Select',
	propTypes: {
		items: React.PropTypes.object,
		value: React.PropTypes.any
	},

	getDefaultProps: function() {
		return {
			items: {},
			value: ''
		};
	},

	componentDidMount: function() {
		this._handleChange();
	},

	_handleChange: function() {
		this.refs.box.getDOMNode().innerHTML = this._getNameByValue(this.refs.select.getDOMNode().value);
	},

	_handleFocus: function() {
		this.refs.container.getDOMNode().classList.add('is-focused');
	},

	_handleBlur: function() {
		this.refs.container.getDOMNode().classList.remove('is-focused');
	},

	_getNameByValue: function(needleValue) {
		let items = this.props.items;
		for (let name in items) {
			let value = items[name];
			if (String(value) === String(needleValue)) {
				return name;
			}
		}
	},

	getValue: function() {
		return this.refs.select.getDOMNode().value;
	},

	render: function() {
		let items = this.props.items;
		let options = Object.keys(items).map(function(name) {
			let value = items[name];
			return (
				<option value={value} key={value}>{name}</option>
			);
		});

		return (
			<div className={b} ref="container">
				<div ref="box" className={b('box')}>{this.props.value}</div>
				<select ref="select" className={b('select')} defaultValue={this.props.value}
					onChange={this._handleChange}
					onFocus={this._handleFocus}
					onBlur={this._handleBlur}
				>
					{options}
				</select>
			</div>
		);
	}
});
