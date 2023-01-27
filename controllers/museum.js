const Museum = require("../models/museum");

// Create a new museum
const createMuseum = (req, res) => {
	Museum.findOne({ title: req.body.title }, (err, existingMuseum) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (existingMuseum) {
			return res.status(400).json({ message: "Museum already exists" });
		}
		if (!req.body.title || !req.body.location || !req.body.founded) {
			return res.status(400).json({
				message: "Title, location, and founded are required",
			});
		}
		const museum = new Museum({
			title: req.body.title,
			location: req.body.location,
			founded: req.body.founded,
		});
		museum.save((err) => {
			if (err) {
				return res.status(500).json({ message: err });
			}
			res.json({ message: "Museum created successfully" });
		});
	});
};

// Get all museums
const getAllMuseums = (req, res) => {
	Museum.find({}, (err, museums) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		res.json(museums);
	});
};

// Get a specific museum by ID
const getMuseumsById = (req, res) => {
	Museum.findById(req.params.id, (err, museum) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (!museum) {
			return res.status(404).json({ message: "Museum not found" });
		}
		res.json(museum);
	});
};

// Update a museum by ID
const updateMuseumById = (req, res) => {
	Museum.findById(req.params.id, (err, museum) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (!museum) {
			return res.status(404).json({ message: "Museum not found" });
		}
		if (req.body.title) {
			museum.title = req.body.title;
		}
		if (req.body.location) {
			museum.location = req.body.location;
		}
		if (req.body.founded) {
			museum.founded = req.body.founded;
		}
		museum.save((err) => {
			if (err) {
				return res.status(500).json({ message: err });
			}
			res.json({ message: "Museum updated successfully" });
		});
	});
};

// Delete a museum by ID
const deleteMuseumById = (req, res) => {
	Museum.findByIdAndDelete(req.params.id, (err, museum) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		if (!museum) {
			return res.status(404).json({ message: "Museum not found" });
		}
		res.json({ message: "Museum deleted successfully" });
	});
};

module.exports = {
	createMuseum,
	getAllMuseums,
	getMuseumsById,
	updateMuseumById,
	deleteMuseumById,
};
