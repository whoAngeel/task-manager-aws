import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { TaskProvider } from "../context/TaskContext";
import Avatar from "../components/Avatar";

function Home() {
	return (
		<TaskProvider>
			<div className="min-w-full">
				<div className="fixed z-30 w-full flex justify-end -my-4 px-4 sm:px-4 md:px-10 lg:px-10 ">
					<Avatar />
				</div>
				<div className="w-10/12  mx-auto">
					<h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold underline text-center my-8">
						Task Manager
					</h1>
					<div className="flex flex-col gap-2">
						<TaskForm />
						<TaskList />
					</div>
				</div>
			</div>
		</TaskProvider>
	);
}

export default Home;
