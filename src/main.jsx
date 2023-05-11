import React from "react";
import ReactDOM from "react-dom/client";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import Error from "./components/Error.jsx";
import "./index.css";
import HostLayout from "./layouts/HostLayout.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/host/Dashboard.jsx";
import Details from "./pages/host/Details.jsx";
import HostVanDetails, {
	hostVansLoader,
} from "./pages/host/HostVanDetails.jsx";
import HostVans, { hostLoader } from "./pages/host/HostVans.jsx";
import Income from "./pages/host/Income.jsx";
import Photos from "./pages/host/Photos.jsx";
import Pricing from "./pages/host/Pricing.jsx";
import Reviews from "./pages/host/Reviews.jsx";
import Login, { loginAction, loginLoader } from "./pages/user/Login.jsx";
import SginUp, { signUpAction } from "./pages/user/SignUp.jsx";
import User from "./pages/user/User.jsx";
import VanDetails, { vanDetailsLoader } from "./pages/vans/VanDetails.jsx";
import Vans, { vansLoader } from "./pages/vans/Vans.jsx";
import { requireAuth } from "./utils/requireAuth.js";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<Error />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />

			<Route path="vans">
				<Route index element={<Vans />} loader={vansLoader} />
				<Route path=":id" element={<VanDetails />} loader={vanDetailsLoader} />
			</Route>

			<Route path="host" element={<HostLayout />}>
				<Route
					index
					element={<Dashboard />}
					loader={async ({ request }) => await requireAuth(request)}
				/>
				<Route
					path="income"
					element={<Income />}
					loader={async ({ request }) => await requireAuth(request)}
				/>
				<Route path="hvans">
					<Route index element={<HostVans />} loader={hostLoader} />
					<Route
						path=":id"
						element={<HostVanDetails />}
						loader={hostVansLoader}
					>
						<Route
							index
							element={<Details />}
							loader={async ({ request }) => await requireAuth(request)}
						/>
						<Route
							path="pricing"
							element={<Pricing />}
							loader={async ({ request }) => await requireAuth(request)}
						/>
						<Route
							path="photos"
							element={<Photos />}
							loader={async ({ request }) => await requireAuth(request)}
						/>
					</Route>
				</Route>
				<Route
					path="reviews"
					element={<Reviews />}
					loader={async ({ request }) => await requireAuth(request)}
				/>
			</Route>

			<Route path="user" element={<User />} />
			<Route
				path="login"
				element={<Login />}
				loader={loginLoader}
				action={loginAction}
			/>
			<Route path="signup" element={<SginUp />} action={signUpAction} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
