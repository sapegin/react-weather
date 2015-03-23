// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import alt from '../alt';

class LocationActions {
	constructor() {
		this.generateActions(
			'remove'
		);
	}

	create(name, interval) {
		this.dispatch({name, interval});
	}
}

export default alt.createActions(LocationActions);
