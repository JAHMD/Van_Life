import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export async function requireAuth() {
	const user = Cookies.get("user");
	if (user) {
		return null;
	}
	return redirect("/login?message=You should be logged in!");
}
