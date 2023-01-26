const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const User = require("./models/user");
const Museum = require("./models/museum");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
	"mongodb://127.0.0.1:27017/mydb",
	{ useNewUrlParser: true },
	(err, connection) => {
		// if (err) {
		// 	console.log("error");
		// } else {
		// 	console.log("success");
		// }
	}
);

const db = mongoose.connection;

app.get("/db-status", (req, res) => {
	if (db.readyState === 1) {
		res.status(200).send({ message: "Success: Connected to MongoDB" });
	} else {
		res.status(500).send({ message: "Error: Not connected to MongoDB" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

// Middleware to check age of user
app.use("/addUser", (req, res, next) => {
	if (req.body.age < 18) {
		res.status(400).json({
			message: "The API Should be used with caution",
		});
	} else {
		next();
	}
});

// Create a new user
app.post("/addUser", (req, res) => {
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
});

// Get all users
app.get("/getAllUsers", (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		res.json(users);
	});
});

// Get a specific user by ID
app.get("/getUser/id/:id", (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	});
});

// Get the user name by email
app.get("/getUser/email/:email", async (req, res) => {
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
});

// Get user by age
app.get("/getUser/age/:age", async (req, res) => {
	try {
		const age = req.params.age;
		const users = await User.find({ age });
		if (!users) {
			res.status(404).json({ message: "Users not found" });
		}
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get user by name
app.get("/getUser/name/:name", async (req, res) => {
	try {
		const name = req.params.name;
		const user = await User.findOne({ name });
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Update a user based on ID
app.put("/updateUser/updateById/:id", async (req, res) => {
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
});

// Update a user based on email
app.put("/updateUser/updateByEmail/:email", async (req, res) => {
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
});
