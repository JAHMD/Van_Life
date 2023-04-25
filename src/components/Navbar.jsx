import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<header>
			<NavLink className="site-logo" to="/">
				#VANLIFE
			</NavLink>
			<nav>
				<NavLink to="host">Host</NavLink>
				<NavLink to="about">About</NavLink>
				<NavLink to="vans">Vans</NavLink>
			</nav>
		</header>
	);
}

export default Navbar;
