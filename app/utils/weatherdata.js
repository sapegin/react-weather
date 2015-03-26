// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import 'fetch';

const UNICODE_MINUS = '\u2212';
const RETRY_INTERVAL = 5000;

class WeatherData {
	constructor() {
		this._cities = [];
	}

	subscribe(name, interval, onchange) {
		let cityId = this._cities.length;
		let city = {
			id: cityId,
			name: name,
			interval: interval,
			onchange: onchange
		};
		this._cities.push(city);
		this._fetch(cityId);
	}

	unsubscribe(name) {
		let cityId = this._getIdByName(name);
		let city = this._getCityById(cityId);
		if (city.timer) {
			clearTimeout(city.timer);
		}
		this._cities[city.id] = null;
	}

	_getCityById(cityId) {
		return this._cities[cityId];
	}

	_getIdByName(name) {
			for (let city of this._cities) {
			if (city && city.name === name) {
				return city.id;
			}
		}
	}

	_fetch(cityId) {
		let city = this._getCityById(cityId);
		fetch(this._getApiUrl(city.name))
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				let response = this._parseResponse(json);
				this._emitChange(cityId, response);
				if (!response.error) {
					this._schedule(cityId);
				}
			})
			.catch(() => {
				this._emitError(cityId, 'Data cannot be loaded');
				this._schedule(cityId, RETRY_INTERVAL);
			});
	}

	_schedule(cityId, interval) {
		let city = this._getCityById(cityId);
		city.timer = setTimeout(this._fetch.bind(this, cityId), interval || city.interval);
	}

	_getApiUrl(name) {
		name = encodeURIComponent(name);
		return `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${name}`;
	}

	_parseResponse(json) {
		if (json.cod === '404') {
			return {error: 'City not found.'};
		}

		return {
			temp: this._formatNumber(json.main.temp),
			humidity: json.main.humidity,
			sunrise: json.sys.sunrise,
			sunset: json.sys.sunset,
			windSpeed: json.wind.speed,
			conditions: json.weather[0].main,
			icon: json.weather[0].icon.replace(/[dn]$/, '')
		};
	}

	_formatNumber(number) {
		return String(Math.round(number)).replace(/^\-/, UNICODE_MINUS);
	}

	_emitChange(cityId, data) {
		let city = this._getCityById(cityId);
		if (city && city.onchange) {
			city.onchange(data);
		}
	}

	_emitError(cityId, message) {
		this._emitChange(cityId, {error: message});
	}
}

export default new WeatherData();
