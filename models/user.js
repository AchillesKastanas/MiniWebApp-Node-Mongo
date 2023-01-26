const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
});

userSchema.pre("save", async function (next) {
	try {
		const user = this;
		if (user.isModified("email")) {
			user.email = user.email.toLowerCase();
		}
		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
