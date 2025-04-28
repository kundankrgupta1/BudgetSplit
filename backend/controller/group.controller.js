import groupsModel from "../models/group.model.js";
import userModel from "../models/user.model.js";
import { calculateBalances, simplifyDebts } from "../utils/balanceCalculator.js";

const createGroup = async (req, res) => {
    const { name } = req.body;
    try {
        const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const group = await groupsModel.create({ name, inviteCode, members: [req.user.id] });

        await userModel.findByIdAndUpdate(req.user.id, { $push: { groups: group._id } });

        return res.status(201).json(group);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const joinGroup = async (req, res) => {
    const { inviteCode } = req.params;
    try {
        const group = await groupsModel.findOne({ inviteCode });
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(req.user.id)) {
            group.members.push(req.user.id);
            await group.save();
        }

        await userModel.findByIdAndUpdate(req.user.id, { $push: { groups: group._id } });

        return res.status(200).json(group);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getMembers = async (req, res) => {
    try {
        const group = await groupsModel.findById(req.params.groupId).populate('members', 'name email');
        return res.status(200).json(group.members);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getSettlement = async (req, res) => {
    try {
        const group = await groupsModel.findById(req.params.groupId).populate('expenses');
        const members = await userModel.find({ _id: { $in: group.members } });

        const balances = calculateBalances(group.expenses, members);
        const settlements = simplifyDebts(balances);

        return res.status(200).json({ balances, settlements });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getGroup = async (req, res) => {
	try {
		// Fetch group by ID and populate members, expenses
		const group = await groupsModel.findById(req.params.groupId)
			.populate('members', 'name email')  // populate members with name and email
			.populate('expenses');  // populate expenses with all expense details

		// Handle case when group is not found
		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		// Step 1: Calculate balances based on the expenses
		const balances = calculateBalances(group.expenses, group.members);

		// Step 2: Simplify debts (balance settlements)
		const simplifiedDebts = simplifyDebts(balances);

		// Step 3: Format the response
		const groupData = {
			_id: group._id,
			name: group.name,
			inviteCode: group.inviteCode,
			members: group.members || [],
			expenses: group.expenses || [],
			balances: simplifiedDebts || [],
			createdAt: group.createdAt,
			updatedAt: group.updatedAt
		};

		// Send the calculated and simplified group data as a response
		return res.status(200).json(groupData);

	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message });
	}
};

const getUserGroups = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate('groups');
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json(user.groups);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export { createGroup, joinGroup, getMembers, getSettlement, getGroup, getUserGroups };
