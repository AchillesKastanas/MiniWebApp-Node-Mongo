const User = require("../models/user");

// Middleware function to check age of user
const checkAge = (req, res, next) => {
	if (req.body.age < 18) {
		res.status(400).json({
			message: "The API Should be used with caution",
		});
	} else {
		next();
	}
};

// Create a new user
const createUser = (req, res) => {
	User.findOne(
		{ email: req.body.email.toLowerCase() },
		(err, existingUser) => {
			if (err) {
				return res.status(500).json({ message: err });
			}
			if (existingUser) {
				return res
					.status(400)
					.json({ message: "Email already exists" });
			}
			if (!req.body.name || !req.body.age || !req.body.email) {
				return res
					.status(400)
					.json({ message: "Name, age, and email are required" });
			}
			const user = new User({
				name: req.body.name,
				age: req.body.age,
				email: req.body.email.toLowerCase(),
			});
			user.save((err) => {
				if (err) {
					return res.status(500).json({ message: err });
				}
				res.json({ message: "User created successfully" });
			});
		}
	);
};

// Get all users
const getAllUsers = (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		res.json(users);
	});
};

// Get a specific user by ID
const getUsersById = (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	});
};

// Get the user name by email
const getUsersByEmail = async (req, res) => {
	try {
		const email = req.params.email;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		res.json({ name: user.name });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user by age
const getUsersByAge = async (req, res) => {
	try {
		const age = req.params.age;
		const users = await User.find({ age });
		if (!users) {
			return res.status(404).json({ message: "Users not found" });
		}
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get user by name
const getUsersByName = async (req, res) => {
	try {
		const name = req.params.name;
		const user = await User.findOne({ name });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updateUserById = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedUser) {
			res.status(404).json({ message: "User not found" });
		}
		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUserByEmail = async (req, res) => {
	try {
		const email = req.params.email;
		const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
			new: true,
		});
		if (!updatedUser) {
			res.status(404).json({ message: "User not found" });
		}
		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteUserById = async (req, res) => {
	try {
		const id = req.params.id;
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			res.status(404).json({ message: "User not found" });
		}
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Export the middleware and controller functions
module.exports = {
	checkAge,
	createUser,
	getUsersById,
	getAllUsers,
	getUsersByEmail,
	getUsersByAge,
	getUsersByName,
	updateUserById,
	updateUserByEmail,
	deleteUserById,
};
