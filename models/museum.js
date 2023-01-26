const mongoose = require("mongoose");

const museumSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: { type: String },
	founded: { type: Number },
});

const Museum = mongoose.model("Museum", museumSchema);

module.exports = Museum;
