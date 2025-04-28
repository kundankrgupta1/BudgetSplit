import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaUsersCog } from "react-icons/fa";
import Loader from "./Loader";

const CreateGroup = () => {
	const [groupName, setGroupName] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleCreateGroup = async (e) => {
		e.preventDefault();

		if (!groupName.trim()) {
			return toast.error("Please enter a group name!");
		}

		try {
			setLoading(true);
			const { data } = await API.post("/groups/create", { name: groupName });
			toast.success(`Group "${data.name}" created!`);
			setGroupName("");
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Failed to create group!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-indigo-600 flex items-center justify-center gap-2 mb-6">
					<FaUsersCog /> Create New Group
				</h2>
				<form onSubmit={handleCreateGroup} className="space-y-4">
					<div>
						<label className="block text-gray-700 font-medium mb-1">Group Name</label>
						<input
							type="text"
							placeholder="e.g. Weekend Trip"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition"
					>
						{loading ? <Loader small /> : "Create Group"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateGroup;
