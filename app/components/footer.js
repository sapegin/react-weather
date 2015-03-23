// Author: Artem Sapegin, http://sapegin.me, 2015

'use strict';

export default React.createClass({
	displayName: 'Footer',

	render: function() {
		return (
			<footer className="footer">
				<div className="footer-i">
					© <a href="http://sapegin.me/" className="link">Artem Sapegin</a>, 2015. <a href="http://www.danvierich.de/weather/" className="link">Simple Weather Icons</a> by Daniel Vierich
				</div>
			</footer>
		);
	}
});
