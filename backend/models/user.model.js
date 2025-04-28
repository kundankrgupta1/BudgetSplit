import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	groups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group'
		}
	]
}, {
	timestamps: true
});

const userModel = mongoose.model('User', userSchema);

export default userModel;