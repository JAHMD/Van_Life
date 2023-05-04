import { redirect } from "react-router-dom";

export async function requireAuth() {
	const isLoggedIn = false;
	if (!isLoggedIn) {
		return redirect("/login");
	}
	return null;
}