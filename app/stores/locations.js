// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

const STORE_ID = 'LocationsStore';

import alt from '../alt';
import LocationActions from '../actions/locationactions';

class LocationsStore {
	constructor() {
		this.bindAction(LocationActions.create, this.onAddLocation);
		this.bindAction(LocationActions.remove, this.onRemoveLocation);
		this._load();
	}

	onAddLocation(location) {
		location.name = location.name.trim();
		if (!location.name) {
			return false;
		}

		let id = this._getNewId();
		location.id = id;
		location.interval = Number(location.interval);
		this.locations[id] = location;
		this._save();
	}

	onRemoveLocation(id) {
		if (!id) {
			return;
		}

		delete this.locations[id];
		this._save();
	}

	_load() {
		let data = JSON.parse(localStorage.getItem(STORE_ID));
		this.locations = data || {};
	}

	_save() {
		localStorage.setItem(STORE_ID, JSON.stringify(this.locations));
	}

	_getNewId() {
		return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	}

	static getLocations() {
		let state = this.getState().locations;
		let locations = [];
		for (let id in state) {
			locations.push(state[id]);
		}
		return locations;
	}
}

export default alt.createStore(LocationsStore, STORE_ID);
