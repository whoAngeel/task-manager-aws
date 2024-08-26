import { message } from "antd";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTask = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTask must be used within a TaskProvider");
	}
	return context;
};

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	const [filtro, setFiltro] = useState("all");
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		fetchTasks();
	}, []);

	const filteredTasks = tasks.filter((task) => {
		if (filtro === "all") return true;
		if (filtro === "completed") return task.completed;
		if (filtro === "pending") return !task.completed;
		return false;
	});
	const changeFilter = (filtro) => {
		setFiltro(filtro);
	};

	const fetchTasks = async () => {
		setIsLoading(true);
		try {
			// const response = await axios.get(
			// 	`${import.meta.env.VITE_API_URL}/tasks`
			// );
			const response = await axios.get(`/api/tasks`);
			setTasks(response.data);
		} catch (error) {
			console.log(error);
			messageApi.error("Error loading tasks!!");
		} finally {
			setIsLoading(false);
			setIsInitialized(true);
		}
	};

	const clearTasks = () => {
		setTasks([]);
		setIsInitialized(false);
		console.log("tasks cleared", tasks.length);
	};
	return (
		<TaskContext.Provider
			value={{
				changeFilter,
				filteredTasks,
				messageApi,
				isLoading,
				isInitialized,
				clearTasks,
			}}
		>
			{contextHolder}
			{children}
		</TaskContext.Provider>
	);
};
