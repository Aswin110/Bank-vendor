const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	googleId: {
		type:String,
		required:true
	},
	displayName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	profilePicture: {
		type:String
	}
});

// userSchema.statics.isUsernameTaken = async function isUsernameTaken (username) {
// 	return this.exists({username})
// 		.collation({ locale:'en', strength:2 })
// 		.exec();
// };

// userSchema.pre('save', async function (next) {
// 	const user = this;
// 	if (!user.isModified('password')) {return next();}

// 	bcrypt.hash(user.password, 10).then((hashedPassword)=> {
// 		user.password = hashedPassword;
// 		next();
// 	}).catch((err)=> next(err));
// });

// userSchema.methods.isValidPassword = async function (password) {
// 	const user = this;
// 	const compare = await bcrypt.compare(password, user.password);
  
// 	return compare;
// };

module.exports = mongoose.model('User', userSchema);