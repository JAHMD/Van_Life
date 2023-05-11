import { signInWithEmailAndPassword } from "firebase/auth";
import {
	Form,
	NavLink,
	redirect,
	useActionData,
	useLoaderData,
	useNavigation,
} from "react-router-dom";
import { auth } from "../../utils/api";

export function loginLoader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export async function loginAction({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const pathname =
		new URL(request.url).searchParams.get("redirectURL") || "/host";

	try {
		await signInWithEmailAndPassword(auth, email, password);
		return redirect(pathname);
	} catch (e) {
		return e.message;
	}
}

function Login() {
	const message = useLoaderData();
	const errorMessage = useActionData();
	const { state } = useNavigation();
	const isSubmitting = state === "submitting";
	const user = auth?.currentUser;

	if (user) {
		return redirect("/user", { replace: true });
	}

	return (
		<section className="login-container">
			<h1>Sign in to your account</h1>
			{message ? <h3 className="red">{message}</h3> : null}
			{errorMessage ? <h3 className="red">{errorMessage}</h3> : null}

			<Form method="POST" replace className="login-form">
				<input name="email" type="email" placeholder="Email address" required />
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<button disabled={isSubmitting}>
					{isSubmitting ? "Logging in..." : "Log in"}
				</button>
			</Form>
			<p>
				Don’t have an account yet?{" "}
				<NavLink
					to="/signup"
					style={{
						textDecoration: "underline",
						fontWeight: "500",
					}}
				>
					Sign up
				</NavLink>
			</p>
		</section>
	);
}

export default Login;
