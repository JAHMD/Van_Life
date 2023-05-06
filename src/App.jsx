import { Outlet } from "react-router-dom";
import "../server/server";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
