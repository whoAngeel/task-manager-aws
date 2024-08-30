import { message } from "antd";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
	const navigate = useNavigate();
	const login = async (email, password) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{ email, password }
			);
			setCookie("user", response.data);
			navigate("/");
		} catch (error) {
			console.log(error);
			messageApi.error("Error logging in");
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		removeCookie("user");
		setUser(null);
		navigate("/login");
	};

	const register = async (userData) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/register`,
				userData
			);
			console.log(response.data);
			setCookie("user", response.data);
			navigate("/");
		} catch (error) {
			console.log(error);
			messageApi.error(
				error.status == 409 ? "User already exists" : "Error registering"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
			{contextHolder}
			{children}
		</AuthContext.Provider>
	);
};
