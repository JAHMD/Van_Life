import Cookies from "js-cookie";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";

export function loginLoader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

function Login() {
	const navigate = useNavigate();
	const isUser = Cookies.get("user");
	const user = isUser ? JSON.parse(isUser) : null;
	const message = useLoaderData();

	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
	});

	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		getUser(loginFormData);
	}

	async function getUser(loginFormData) {
		if (!loginFormData.password && !loginFormData.email) return;
		setError(null);
		setStatus("submitting");
		try {
			const res = await loginUser(loginFormData);
			if (res.user) {
				Cookies.set("user", JSON.stringify(res.user));
				navigate("/host");
			}
		} catch (err) {
			setError(err);
		}
		setStatus("idle");
		return;
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	function logout() {
		Cookies.remove("user");
		navigate("/");
	}

	if (user) {
		return (
			<section className="login-container">
				<h1>Welcome back {user.name}</h1>
				<button className="link-button" onClick={logout}>
					Log out
				</button>
			</section>
		);
	}

	return (
		<section className="login-container">
			<h1>Sign in to your account</h1>
			{message ? <h3 style={{ color: "red" }}>{message}</h3> : null}
			{error && <h3 style={{ color: "red" }}>{error.message}</h3>}

			<form onSubmit={handleSubmit} className="login-form">
				<input
					name="email"
					onChange={handleChange}
					type="email"
					placeholder="Email address"
					value={loginFormData.email}
					required
				/>
				<input
					name="password"
					onChange={handleChange}
					type="password"
					placeholder="Password"
					value={loginFormData.password}
					required
				/>
				<button disabled={status === "submitting"}>
					{status === "submitting" ? "Logging in" : "Log in"}
				</button>
			</form>
		</section>
	);
}

export default Login;
