const express = require("express");
const router = express.Router();
const museumsController = require("../controllers/museums.js");

router.post("/add", museumsController.createMuseum);
router.get("/getAll", museumsController.getAllMuseums);
router.get("/getById/:id", museumsController.getMuseumsById);
router.put("/updateById/:id", museumsController.updateMuseumById);
router.delete("/deleteMuseum/:id", museumsController.deleteMuseumById);

module.exports = router;
