import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaFileDownload, FaArrowLeft, FaHistory } from "react-icons/fa";
import Loader from "./Loader";
import API from "../api/api";

const ExpenseHistory = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchExpenses = async () => {
		try {
			setLoading(true);
			const { data } = await API.get(`/expenses/${id}`);
			setExpenses(data.expenses || []);
		} catch (error) {
			console.error(error);
			toast.error("Failed to fetch expenses!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchExpenses();
	}, [id]);

	const downloadCSV = () => {
		if (expenses.length === 0) {
			toast.error("No expenses to download.");
			return;
		}

		const csvRows = [
			["Description", "Amount", "Paid By", "Participants", "Date"]
		];

		expenses.forEach(exp => {
			const participants = exp.participants.map(p => p.email).join(", ");
			csvRows.push([
				exp.description,
				exp.amount,
				exp.payer.email,
				participants,
				new Date(exp.date).toLocaleDateString()
			]);
		});

		const csvContent =
			"data:text/csv;charset=utf-8," +
			csvRows.map(e => e.join(",")).join("\n");

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "expense_history.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast.success("Downloaded successfully!");
	};

	if (loading) return <Loader />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-4">
			<div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-yellow-700 flex items-center gap-2">
						<FaHistory /> Expense History
					</h2>
					<div className="flex gap-4">
						<button
							onClick={downloadCSV}
							className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
						>
							<FaFileDownload /> Download CSV
						</button>
						<button
							onClick={() => navigate(-1)}
							className="flex items-center gap-1 text-yellow-500 hover:text-yellow-700"
						>
							<FaArrowLeft /> Back
						</button>
					</div>
				</div>

				{expenses.length === 0 ? (
					<p className="text-gray-600 text-center">No expenses logged yet. 🧘</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full table-auto">
							<thead>
								<tr className="bg-yellow-200 text-yellow-700">
									<th className="p-2">Description</th>
									<th className="p-2">Amount</th>
									<th className="p-2">Paid By</th>
									<th className="p-2">Participants</th>
									<th className="p-2">Date</th>
								</tr>
							</thead>
							<tbody>
								{expenses.map((expense) => (
									<tr key={expense._id} className="border-b hover:bg-yellow-50">
										<td className="p-2">{expense.description}</td>
										<td className="p-2">₹{expense.amount}</td>
										<td className="p-2">{expense.payer.email}</td>
										<td className="p-2">{expense.participants.map(p => p.email).join(", ")}</td>
										<td className="p-2">{new Date(expense.date).toLocaleDateString()}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default ExpenseHistory;
