import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaPlus, FaHistory, FaUsers, FaFileInvoiceDollar } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav className="bg-white shadow-md p-4 flex justify-between items-center">
			<Link to="/dashboard" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
				<FaMoneyBillWave /> BudgetSplit
			</Link>

			<div className="flex gap-4 text-gray-700 font-medium text-sm">
				<Link to="/create" className="flex items-center gap-1 hover:text-indigo-500"><FaPlus /> Create</Link>
				<Link to="/add-expense" className="flex items-center gap-1 hover:text-indigo-500"><FaFileInvoiceDollar /> Expense</Link>
				<Link to="/settle-up" className="flex items-center gap-1 hover:text-indigo-500"><FaUsers /> Settle</Link>
				<Link to="/history" className="flex items-center gap-1 hover:text-indigo-500"><FaHistory /> History</Link>
			</div>
		</nav>
	);
};

export default Navbar;
