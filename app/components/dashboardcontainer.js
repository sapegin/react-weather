// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import LocationsStore from '../stores/locations';
import Dashboard from './dashboard';

export default React.createClass({
	displayName: 'DashboardContainer',

	getInitialState: function() {
		return this._getStateFromStores();
	},

	componentDidMount: function() {
		LocationsStore.listen(this._onChange);
	},

	componentWillUnmount: function() {
		LocationsStore.unlisten(this._onChange);
	},

	_onChange: function() {
		this.setState(this._getStateFromStores());
	},

	_getStateFromStores: function() {
		return {
			locations: LocationsStore.getLocations()
		};
	},

	render: function() {
		return (
			<Dashboard locations={this.state.locations}/>
		);
	}
});
