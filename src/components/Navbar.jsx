import { NavLink } from "react-router-dom";
import userIcon from "../assets/images/avatar_profile_icon.svg";

function Navbar() {
	return (
		<header>
			<NavLink className="site-logo" to="/">
				#VANLIFE
			</NavLink>
			<nav>
				<NavLink to=".">Home</NavLink>
				<NavLink to="protected">Test</NavLink>
				<NavLink to="about">About</NavLink>
				<NavLink to="vans">Vans</NavLink>
				<NavLink to="host">Host</NavLink>
				<NavLink to="login">
					<img src={userIcon} alt="user icon" height={20} />
				</NavLink>
			</nav>
		</header>
	);
}

export default Navbar;
