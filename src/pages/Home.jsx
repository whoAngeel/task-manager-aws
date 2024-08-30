import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { TaskProvider } from "../context/TaskContext";
import Avatar from "../components/AvatarDrop";

function Home() {
	return (
		<TaskProvider>
			<div className="min-w-full">
				<div className="fixed z-30 w-full flex justify-end -my-4 px-4 sm:px-4 md:px-10 lg:px-36 ">
					<Avatar />
				</div>
				<div className="">
					<h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold underline text-center my-8">
						Task Manager
					</h1>
					<div className="flex flex-col gap-2 w-10/12 mx-auto  sm:w-10/12 md:w-7/12 lg:w-5/12">
						<TaskForm />
						<TaskList />
					</div>
				</div>
			</div>
		</TaskProvider>
	);
}

export default Home;
