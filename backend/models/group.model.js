import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	inviteCode: {
		type: String,
		required: true,
		unique: true,
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	expenses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Expense',
		},
	],
}, { timestamps: true });

const groupsModel = mongoose.model('Group', groupSchema);

export default groupsModel;
