import React from "react";
import ReactDOM from "react-dom/client";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Error from "./components/Error";
import "./index.css";
import HostLayout from "./layouts/HostLayout";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound";
import Test, { testLoader } from "./pages/Test";
import Dashboard from "./pages/host/Dashboard";
import Details from "./pages/host/Details";
import HostVanDetails, { hostVansLoader } from "./pages/host/HostVanDetails";
import HostVans, { hostLoader } from "./pages/host/HostVans";
import Income from "./pages/host/Income";
import Photos from "./pages/host/Photos";
import Pricing from "./pages/host/Pricing";
import Reviews from "./pages/host/Reviews";
import Login from "./pages/login/Login";
import VanDetails, { vanDetailsLoader } from "./pages/vans/VanDetails";
import Vans, { vansLoader } from "./pages/vans/Vans";
import { requireAuth } from "./utils/requireAuth";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />
			<Route path="vans" errorElement={<Error />}>
				<Route index element={<Vans />} loader={vansLoader} />
				<Route path=":id" element={<VanDetails />} loader={vanDetailsLoader} />
			</Route>
			<Route
				path="host"
				element={<HostLayout />}
				loader={async () => requireAuth()}
			>
				<Route
					index
					element={<Dashboard />}
					loader={async () => requireAuth()}
				/>
				<Route
					path="income"
					element={<Income />}
					loader={async () => requireAuth()}
				/>
				<Route path="hvans">
					<Route index element={<HostVans />} loader={hostLoader} />
					<Route
						path=":id"
						element={<HostVanDetails />}
						loader={hostVansLoader}
					>
						<Route index element={<Details />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="photos" element={<Photos />} />
					</Route>
				</Route>
				<Route
					path="reviews"
					element={<Reviews />}
					loader={async () => requireAuth()}
				/>
			</Route>
			<Route path="protected" element={<Test />} loader={testLoader} />
			<Route path="login" element={<Login />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
