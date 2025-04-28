import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/Dashbaord";
import CreateGroup from "./components/CreateGroup";
import JoinGroup from "./components/JoinGroup";
import AddExpense from "./components/AddExpense";
import SettleUp from "./components/SettleUp";
import ExpenseHistory from "./components/ExpenseHistory";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import GroupDetails from "./components/GroupDetails";

function App() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
				<Route path="/create-group" element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
				<Route path="/join/:inviteCode" element={<PrivateRoute><JoinGroup /></PrivateRoute>} />
				<Route path="/groups/:id" element={<PrivateRoute><GroupDetails /></PrivateRoute>} />
				<Route path="/groups/:id/add-expense" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
				<Route path="/settle-up" element={<PrivateRoute><SettleUp /></PrivateRoute>} />
				<Route path="/history" element={<PrivateRoute><ExpenseHistory /></PrivateRoute>} />
			</Routes>
		</div>
	);
}

export default App;
