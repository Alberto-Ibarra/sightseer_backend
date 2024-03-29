const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please provide an Email'],
		unique: [true, 'Email exist'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password.'],
		unique: false,
	},
});
const User = mongoose.model('Users', UserSchema);
module.exports = User;
