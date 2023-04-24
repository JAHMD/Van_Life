import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

import Van from "./pages/Van";
import Vans from "./pages/Vans";
import "./server/server";

function App() {
	return (
		<BrowserRouter>
			<header>
				<NavLink className="site-logo" to="/">
					#VANLIFE
				</NavLink>
				<nav>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/vans">Vans</NavLink>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/vans" element={<Vans />} />
				<Route path="/vans/:id" element={<Van />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
