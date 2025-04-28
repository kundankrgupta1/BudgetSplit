import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', required: true
	},
	percentage: {
		type: Number,
		required: true
	}
});

const expenseSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	payer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	participants: [participantSchema],
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
		required: true
	}
});

const expensModel = mongoose.model('Expense', expenseSchema);

export default expensModel;
