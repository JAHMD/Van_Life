import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../utils/api";

function User() {
	const navigate = useNavigate();
	const user = auth?.currentUser;

	async function logout() {
		await signOut(auth);
		navigate("/", { replace: true });
	}

	return (
		<section className="login-container">
			{user ? (
				<section className="login-container">
					<h1>Welcome back {user.displayName}</h1>
					<button className="link-button" onClick={logout}>
						Log out
					</button>
				</section>
			) : (
				<Navigate to="/login" replace />
			)}
		</section>
	);
}

export default User;
