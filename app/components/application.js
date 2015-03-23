// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

import Header from './header';
import Footer from './footer';
import DashboardContainer from './dashboardcontainer';
import LocationForm from './locationform';

export default React.createClass({
	displayName: 'Application',

	render: function() {
		return (
			<div>
				<Header/>
				<DashboardContainer/>
				<LocationForm/>
				<Footer/>
			</div>
		);
	}
});
