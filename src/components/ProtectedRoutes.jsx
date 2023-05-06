import { Navigate, Outlet } from "react-router-dom";
import { requireAuth } from "../utils/requireAuth";

function ProtectedRoutes() {
	const auth = requireAuth();

	return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
