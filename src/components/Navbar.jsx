import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import userIcon from "../assets/images/avatar_profile_icon.svg";

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	return (
		<header>
			<NavLink className="site-logo" to="/">
				#VANLIFE
			</NavLink>
			<button
				className="menu-btn"
				onClick={() => setToggleMenu((oldState) => !oldState)}
			>
				<FiMenu />
			</button>
			<nav className={toggleMenu ? "active" : ""}>
				<NavLink to=".">Home</NavLink>
				<NavLink to="about">About</NavLink>
				<NavLink to="vans">Vans</NavLink>
				<NavLink to="host">Host</NavLink>
				<NavLink to="user">
					<img src={userIcon} alt="user icon" height={20} />
				</NavLink>
			</nav>
		</header>
	);
}

export default Navbar;
