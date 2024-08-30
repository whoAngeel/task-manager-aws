import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import { TaskProvider } from "../context/TaskContext";
import GIS from "../pages/GIS";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					index
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/map-test" element={<GIS />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthProvider>
	);
}

export default AppRoutes;
