import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import { TaskProvider } from "../context/TaskContext";

function AppRoutes() {
	return (
		<TaskProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</TaskProvider>
	);
}

export default AppRoutes;
