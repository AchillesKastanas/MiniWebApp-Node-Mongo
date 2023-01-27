require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRouter = require("./routes/users");
const museumsRouter = require("./routes/museums");
const User = require("./models/user");
const Museum = require("./models/museum");

const app = express();
app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use("/museums", museumsRouter);

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
