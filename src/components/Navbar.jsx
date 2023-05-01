import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<header>
			<NavLink className="site-logo" to="/">
				#VANLIFE
			</NavLink>
			<nav>
				<NavLink to=".">Home</NavLink>
				<NavLink to="about">About</NavLink>
				<NavLink to="vans">Vans</NavLink>
				<NavLink to="host">Host</NavLink>
			</nav>
		</header>
	);
}

export default Navbar;
