import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FunctionComponent = () => {
	return (
		<header>
			<div className="container">
				<NavLink className="menu-link" to="/" exact>Search</NavLink>
				<NavLink className="menu-link" to="/starred">Starred words</NavLink>
			</div>
		</header>
	);
}
export default Header;