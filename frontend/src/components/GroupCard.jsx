import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

const GroupCard = ({ group }) => {
	const navigate = useNavigate();

	const copyInviteLink = () => {
		const link = `${window.location.origin}/join-group?code=${group.inviteCode}`;
		navigator.clipboard.writeText(link);
		toast.success("Invite link copied!");
	};

	return (
		<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
			<h2 className="text-lg font-bold mb-2 text-indigo-600">{group.name}</h2>
			<p className="text-gray-600 mb-4">
				Members: <span className="font-semibold">{group.members.length}</span>
			</p>
			<div className="flex gap-4">
				<button
					onClick={() => navigate(`/groups/${group._id}`)}
					className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md text-sm"
				>
					View Group
				</button>
				<button
					onClick={copyInviteLink}
					className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md flex items-center gap-1 text-sm"
				>
					<FaLink /> Copy Link
				</button>
			</div>
		</div>
	);
};

export default GroupCard;
