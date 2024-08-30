import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
	const [cookies] = useCookies(["user"]);
	const userId = cookies.user?.userId;
	if (!userId) {
		return <Navigate to={"/login"} />;
	}
	return children;
}

export default ProtectedRoute;
