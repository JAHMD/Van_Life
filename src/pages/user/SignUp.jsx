import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
	Form,
	NavLink,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";
import { auth } from "../../utils/api";

export async function signUpAction({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const name = formData.get("name");
	const password = formData.get("password");

	try {
		await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, { displayName: name });
		return redirect("/user");
	} catch (e) {
		return e.message;
	}
}

function SginUp() {
	const user = auth?.currentUser;
	const errorMessage = useActionData();
	const { state } = useNavigation();
	const isSubmitting = state === "submitting";

	if (user) {
		return redirect("/user", { replace: true });
	}

	return (
		<section className="login-container">
			<h1>Create an account </h1>
			{errorMessage ? <h3 className="red">{errorMessage}</h3> : null}
			<Form method="POST" className="login-form">
				<input name="email" type="email" placeholder="Email address" required />
				<input name="name" type="text" placeholder="Your name" required />
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<button disabled={isSubmitting}>
					{isSubmitting ? "Signing up..." : "Sign up"}
				</button>
			</Form>
			<p>
				Already have an account?{" "}
				<NavLink
					to="/login"
					style={{
						textDecoration: "underline",
						fontWeight: "500",
					}}
				>
					Login here
				</NavLink>
			</p>
		</section>
	);
}

export default SginUp;
