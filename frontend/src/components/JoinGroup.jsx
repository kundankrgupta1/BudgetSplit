import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaSignInAlt } from "react-icons/fa";
import Loader from "./Loader";

const JoinGroup = () => {
	const [inviteCode, setInviteCode] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleJoinGroup = async (e) => {
		e.preventDefault();

		if (!inviteCode.trim()) {
			return toast.error("Please enter an invite code!");
		}

		try {
			setLoading(true);
			const { data } = await API.post("/groups/join", { inviteCode });
			toast.success(`Joined group: "${data.name}" successfully!`);
			setInviteCode("");
			navigate("/dashboard");
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Failed to join group!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-200 p-4">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold text-center text-teal-600 flex items-center justify-center gap-2 mb-6">
					<FaSignInAlt /> Join Group
				</h2>
				<form onSubmit={handleJoinGroup} className="space-y-4">
					<div>
						<label className="block text-gray-700 font-medium mb-1">Invite Code</label>
						<input
							type="text"
							placeholder="Enter group invite code"
							value={inviteCode}
							onChange={(e) => setInviteCode(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition"
					>
						{loading ? <Loader small /> : "Join Group"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default JoinGroup;
