import React from "react";
import TaskList from "../components/TaskList";

function Home() {
	return (
		<div className="min-w-full">
			<div className="w-10/12  mx-auto">
				<h1 className="text-3xl font-bold underline text-center my-8">
					Task Manager
				</h1>
				<div>
					<TaskList />
				</div>
			</div>
		</div>
	);
}

export default Home;
