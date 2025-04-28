import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaUsers, FaMoneyBillWave, FaPlus, FaArrowLeft } from "react-icons/fa";
import Loader from "./Loader";

const GroupDetails = () => {
	const { id } = useParams();
	const [group, setGroup] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const fetchGroupDetails = async () => {
		try {
			setLoading(true);
			const { data } = await API.get(`/groups/${id}`);
			console.log(data);
			
			setGroup(data);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load group details!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchGroupDetails();
	}, [id]);

	if (loading) return <Loader />;

	if (!group) return <p className="text-center text-gray-500">Group not found.</p>;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
			<div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
						<FaUsers /> {group.name}
					</h2>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700"
					>
						<FaArrowLeft /> Back
					</button>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-2">Members:</h3>
					<ul className="list-disc list-inside space-y-1 text-gray-600">
						{group.members.map((member) => (
							<li key={member._id}>{member.email}</li>
						))}
					</ul>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-2">Balances:</h3>
					<ul className="space-y-2">
						{group.balances.length === 0 ? (
							<p className="text-gray-500">No balances yet. Add an expense!</p>
						) : (
							group.balances.map((bal, index) => (
								<li
									key={index}
									className={`p-2 rounded-md ${bal.amount < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
										}`}
								>
									{bal.from.email} owes {bal.to.email} ₹{Math.abs(bal.amount)}
								</li>
							))
						)}
					</ul>
				</div>

				<div className="flex gap-4">
					<Link
						to={`/groups/${id}/add-expense`}
						className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition"
					>
						<FaPlus /> Add Expense
					</Link>
					<Link
						to={`/groups/${id}/settle`}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
					>
						<FaMoneyBillWave /> Settle Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default GroupDetails;
