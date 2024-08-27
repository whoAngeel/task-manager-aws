import React from "react";
// import { useTask } from "../context/TaskContext.jsx";
import { DeleteOutlined } from "@ant-design/icons";
import { useTask } from "../context/TaskContext";

function TaskItem({ task }) {
	const { deleteTask } = useTask();
	return (
		<div className="w-full bg-purple-300 rounded-lg h-12 p-2 flex content-between items-center justify-between">
			<div className="flex items-center">
				<input
					type="checkbox"
					className="checkbox checkbox-sm"
					checked={task.completed}
					onChange={() => toggleTask(task.id)}
				/>
			</div>
			<div className="w-full mx-2 flex items-center">
				<span className="text-left text-sm sm:text-sm md:text-lg lg:text-lg">
					{task.title}
				</span>
			</div>
			<div className="flex items-center">
				<button
					className="btn btn-sm btn-link"
					onClick={() => deleteTask(task.id)}
				>
					<DeleteOutlined style={{ color: "red" }} />
				</button>
			</div>
		</div>
	);
}

export default TaskItem;
