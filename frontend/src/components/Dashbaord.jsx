import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaSignOutAlt, FaUsers } from "react-icons/fa";
import Loader from "../components/Loader";
import GroupCard from "../components/GroupCard";
import API from "../api/api";

const Dashboard = () => {
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const fetchGroups = async () => {
		try {
			const { data } = await API.get("/groups");
			setGroups(data);
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Failed to load groups");
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.success("Logged out successfully!");
		navigate("/");
	};

	useEffect(() => {
		fetchGroups();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
					<FaUsers /> Your Groups
				</h1>
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
				>
					<FaSignOutAlt /> Logout
				</button>
			</div>

			{groups.length === 0 ? (
				<div className="text-center mt-20">
					<p className="text-gray-700 mb-4">You have not joined any groups yet.</p>
					<div className="flex justify-center gap-4">
						<button
							onClick={() => navigate("/create-group")}
							className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
						>
							<FaPlus /> Create Group
						</button>
						<button
							onClick={() => navigate("/join-group")}
							className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
						>
							<FaPlus /> Join Group
						</button>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{groups.map((group) => (
						<GroupCard key={group._id} group={group} />
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
