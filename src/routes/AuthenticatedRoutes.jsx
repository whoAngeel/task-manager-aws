import { AuthProvider } from "../context/AuthContext";

function AuthenticatedRoutes({ children }) {
	return <AuthProvider>{children}</AuthProvider>;
}

export default AuthenticatedRoutes;
