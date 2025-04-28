import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaSignInAlt } from "react-icons/fa";
import Loader from "./Loader";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email) {
			return toast.error("Please enter an email");
		}
		
		if (!email.includes('@')) {
			return toast.error("Please enter a valid email address");
		}

		try {
			setLoading(true);
			const { data } = await API.post("/users/login", { email, password });
			localStorage.setItem("token", data.token);
			toast.success("Login successful!");
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Login failed!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 flex items-center justify-center gap-2">
					<FaSignInAlt /> Welcome to BudgetSplit
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="block text-gray-700 mb-1 font-medium">Email Address</label>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-1 font-medium">Password</label>
						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition"
					>
						{loading ? <Loader small /> : "Login"}
					</button>
				</form>
				<p className="mt-4 text-center text-gray-600">
					Don't have an account?{" "}
					<Link to="/register" className="text-indigo-500 hover:underline">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
