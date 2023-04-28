import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import HostLayout from "./layouts/HostLayout";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/host/Dashboard";
import Details from "./pages/host/Details";
import HostVanDetails from "./pages/host/HostVanDetails";
import HostVans from "./pages/host/HostVans";
import Income from "./pages/host/Income";
import Photos from "./pages/host/Photos";
import Pricing from "./pages/host/Pricing";
import Reviews from "./pages/host/Reviews";
import VanDetails from "./pages/vans/VanDetails";
import Vans from "./pages/vans/Vans";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="vans">
						<Route index element={<Vans />} />
						<Route path=":id" element={<VanDetails />} />
					</Route>
					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="hvans">
							<Route index element={<HostVans />} />
							<Route path=":id" element={<HostVanDetails />}>
								<Route index element={<Details />} />
								<Route path="pricing" element={<Pricing />} />
								<Route path="photos" element={<Photos />} />
							</Route>
						</Route>
						<Route path="reviews" element={<Reviews />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
