import React from "react";
import { useTask } from "../context/TaskContext";
import { Empty } from "antd";
import TaskItem from "./TaskItem";

function TaskList() {
	const { filteredTasks: tasks, isLoading, isInitialized } = useTask();

	if (!isInitialized || isLoading) {
		return <div>Loading...</div>;
	}

	if (!tasks || tasks.length === 0) {
		return (
			<div>
				<Empty />
			</div>
		);
	}
	return (
		<div className="w-full grid grid-cols-1 gap-2 ">
			{tasks.map((task, index) => (
				<TaskItem task={task} key={index} />
			))}
		</div>
	);
}

export default TaskList;
