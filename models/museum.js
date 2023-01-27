const mongoose = require("mongoose");

const museumSchema = new mongoose.Schema({
	title: { type: String, required: true },
	location: { type: String, required: true },
	founded: { type: String, required: true },
});

const Museum = mongoose.model("Museum", museumSchema);

module.exports = Museum;
