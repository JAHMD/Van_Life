import { redirect } from "react-router-dom";
import { auth } from "./api";

export async function requireAuth(request) {
	const hasUser = auth?.currentUser;
	const pathname = new URL(request.url).pathname || "/";
	if (!hasUser) {
		return redirect(
			`/login?message=You should be logged in!&redirectURL=${pathname}`
		);
	}
	return null;
}
