import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-base-200 flex flex-col">
				<main className="flex-1">
					<AppRoutes />
				</main>
			</div>
		</Router>
	);
}

export default App;
