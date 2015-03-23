// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import moment from 'moment';
import Block from 'bem-cn';
import LocationActions from '../actions/locationactions';
import WeatherData from '../utils/weatherdata';
import WeatherIcon from './weathericon';

let b = new Block('weather-widget');

export default React.createClass({
	displayName: 'WeatherWidget',
	propTypes: {
		location: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			loading: true
		};
	},

	componentDidMount: function() {
		WeatherData.subscribe(this.props.location.name, this.props.location.interval, this._onChange);
	},

	componentWillUnmount: function() {
		WeatherData.unsubscribe(this.props.location.name);
	},

	_onChange: function(state) {
		this.setState({
			loading: false,
			weather: state
		});
	},

	_handleRemove: function() {
		LocationActions.remove(this.props.location.id);
	},

	_splitLocation: function(location) {
		location = location.split(/,\s*/);
		return {
			city: location[0],
			country: location[1] || ''
		};
	},

	_formatTime: function(timestamp) {
		return moment.unix(timestamp).format('H:mm');
	},

	render: function() {
		let { city, country } = this._splitLocation(this.props.location.name);
		return (
			<div className={b}>
				<button className={b('remove').mix('close')} title="Remove city" onClick={this._handleRemove}></button>
				<div className={b('location')}>
					<div className={b('city')}>{city}</div>
					<div className={b('country')}>{country}</div>
				</div>
				{this.renderContents()}
			</div>
		);
	},

	renderContents: function() {
		if (this.state.loading) {
			return this.renderSpinner();
		}
		if (this.state.weather.error) {
			return this.renderError();
		}
		else {
			return this.renderWeather();
		}
	},

	renderSpinner: function() {
		return (
			<div className={b('spinner')}>
				<div className={b('spinner-i').mix('spinner')}></div>
			</div>
		);
	},

	renderError: function() {
		return (
			<div className={b('error')}>{this.state.weather.error}</div>
		);
	},

	renderWeather: function() {
		let weather = this.state.weather;
		return (
			<div>
				<div className={b('temp')}>{weather.temp}˚</div>
				<div className={b('icon')}>
					<WeatherIcon icon={weather.icon}/>
				</div>
				<div className={b('details')}>
					<div>Humidity: {weather.humidity}%</div>
					<div>Wind: {weather.windSpeed} mps</div>
					<div>Sunrise: {this._formatTime(weather.sunrise)}</div>
					<div>Sunset: {this._formatTime(weather.sunset)}</div>
				</div>
			</div>
		);
	}
});
