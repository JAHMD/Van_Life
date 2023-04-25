import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import HostLayout from "./layouts/HostLayout";
import VansLayout from "./layouts/VansLayout";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import Van from "./pages/vans/Van";
import Vans from "./pages/vans/Vans";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="reviews" element={<Reviews />} />
					</Route>
					<Route path="about" element={<About />} />
					<Route path="vans" element={<VansLayout />}>
						<Route index element={<Vans />} />
						<Route path=":id" element={<Van />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
