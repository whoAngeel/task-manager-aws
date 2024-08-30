import { message } from "antd";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
	const [cookies, setCookie, removeCookie] = useCookies();
	useEffect(() => {
		fetchTasks();
		// cookies.user.userId
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
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/users/${cookies.user.userId}/tasks`
			);
			// const response = await axios.get(`/api/tasks`);
			setTasks(response.data);
		} catch (error) {
			console.log(error);
			messageApi.error("Error loading tasks!!");
		} finally {
			setIsLoading(false);
			setIsInitialized(true);
		}
	};

	const pushTask = (task) => {
		setTasks([task, ...tasks]); //TODO ordenar en orden de creacion
	};

	const clearTasks = () => {
		setTasks([]);
		setIsInitialized(false);
		console.log("tasks cleared", tasks.length);
	};

	const deleteTask = async (id) => {
		// console.log(id);
		const key = "deletable";

		try {
			messageApi.open({
				key,
				type: "loading",
				content: "Deleting task...",
				duration: 0,
			});
			const response = await axios.delete(
				`${import.meta.env.VITE_API_URL}/users/${
					cookies.user.userId
				}/tasks/${id}`
			);
			messageApi.success({
				key,
				content: "Task deleted successfully!",
				duration: 2,
			});
			setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== id));
		} catch (error) {
			messageApi.error({
				key,
				content: `Error deleting the task`,
				duration: 2,
			});
			console.error(error);
		}
	};

	const toggleTask = async (id) => {
		const key = "updatable";
		try {
			messageApi.open({
				key,
				type: "loading",
				content: "Toggling task...",
				duration: 0,
			});
			const res = await axios.patch(
				`${import.meta.env.VITE_API_URL}/users/${
					cookies.user.userId
				}/tasks/${id}/toggle`
			);
			console.log(res.data);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.taskId === id
						? { ...task, completed: !task.completed }
						: task
				)
			);
			messageApi.success({
				key,
				type: "success",
				content: "Task toggled successfully!",
			});
		} catch (error) {
			messageApi.error({
				key,
				content: `Error updating the task`,
				duration: 2,
			});
			console.log(error);
		}
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
				pushTask,
				deleteTask,
				toggleTask,
			}}
		>
			{contextHolder}
			{children}
		</TaskContext.Provider>
	);
};
