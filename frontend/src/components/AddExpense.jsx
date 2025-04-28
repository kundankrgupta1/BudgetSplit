import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import Loader from "./Loader";

const AddExpense = () => {
	const { id } = useParams();
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [payer, setPayer] = useState("");
	const [participants, setParticipants] = useState([]);
	const [groupMembers, setGroupMembers] = useState([]);
	const [splitType, setSplitType] = useState("equal");
	const [customSplits, setCustomSplits] = useState({});
	const [currency, setCurrency] = useState("INR"); // Currency field
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const fetchGroupMembers = async () => {
		try {
			setLoading(true);
			const { data } = await API.get(`/groups/${id}`);
			setGroupMembers(data.members);
		} catch (error) {
			console.error(error);
			toast.error("Failed to load members!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchGroupMembers();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!amount || !description || !payer || participants.length === 0) {
			toast.error("Please fill all required fields.");
			return;
		}

		// Ensure each participant has a percentage value if splitType is 'custom'
		const finalParticipants = participants.map((p) => {
			// Get percentage for custom split
			let percentage = splitType === "custom" ? customSplits[p] : null;

			// If split type is 'custom' and no percentage is provided, show error
			if (splitType === "custom" && !percentage) {
				toast.error("Please provide a percentage for all participants in custom split.");
				return null; // Skip this participant if no percentage is given
			}

			// Return participant object with percentage for custom split
			return {
				userId: p,
				percentage: percentage || 100, // Default to 100 if equal split
			};
		}).filter(Boolean); // Remove null values from participants array

		// If no valid participants are found, stop submission
		if (finalParticipants.length === 0) {
			toast.error("Please provide valid participants with percentage.");
			return;
		}

		try {
			setLoading(true);
			await API.post(`/expenses/${id}`, {
				amount,
				description,
				payer,
				participants: finalParticipants,
				currency, // Add the currency field
			});

			toast.success("Expense added!");
			navigate(`/groups/${id}`);
		} catch (error) {
			console.error(error);
			toast.error("Failed to add expense!");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loader />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-200 p-4">
			<div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-pink-700 flex items-center gap-2">
						<FaPlus /> Add Expense
					</h2>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-1 text-pink-500 hover:text-pink-700"
					>
						<FaArrowLeft /> Back
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-1 text-gray-700">Amount ₹</label>
						<input
							type="number"
							className="w-full border rounded-md p-2"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block mb-1 text-gray-700">Description</label>
						<input
							type="text"
							className="w-full border rounded-md p-2"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block mb-1 text-gray-700">Payer</label>
						<select
							className="w-full border rounded-md p-2"
							value={payer}
							onChange={(e) => setPayer(e.target.value)}
							required
						>
							<option value="">Select payer</option>
							{groupMembers.map((member) => (
								<option key={member._id} value={member._id}>
									{member.email}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block mb-1 text-gray-700">Participants</label>
						<div className="space-y-2">
							{groupMembers.map((member) => (
								<div key={member._id} className="flex items-center gap-2">
									<input
										type="checkbox"
										value={member._id}
										onChange={(e) => {
											const checked = e.target.checked;
											if (checked) {
												setParticipants([...participants, member._id]);
											} else {
												setParticipants(participants.filter((id) => id !== member._id));
											}
										}}
									/>
									<span>{member.email}</span>
									{splitType === "custom" && participants.includes(member._id) && (
										<input
											type="number"
											placeholder="%"
											className="w-16 border rounded p-1 ml-2"
											value={customSplits[member._id] || ""}
											onChange={(e) =>
												setCustomSplits({ ...customSplits, [member._id]: e.target.value })
											}
										/>
									)}
								</div>
							))}
						</div>
					</div>

					<div>
						<label className="block mb-1 text-gray-700">Split Type</label>
						<select
							className="w-full border rounded-md p-2"
							value={splitType}
							onChange={(e) => setSplitType(e.target.value)}
						>
							<option value="equal">Equal Split</option>
							<option value="custom">Custom Split (%)</option>
						</select>
					</div>

					<div>
						<label className="block mb-1 text-gray-700">Currency</label>
						<input
							type="text"
							className="w-full border rounded-md p-2"
							value={currency}
							onChange={(e) => setCurrency(e.target.value)}
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-md flex items-center justify-center gap-2"
					>
						<FaPlus /> Add Expense
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddExpense;
