const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");

router.use("/add", usersController.checkAge);
router.post("/add", usersController.createUser);
router.get("/getAll", usersController.getAllUsers);
router.get("/getById/:id", usersController.getUsersById);
router.get("/getByEmail/:email", usersController.getUsersByEmail);
router.get("/getByAge/:age", usersController.getUsersByAge);
router.get("/getByName/:name", usersController.getUsersByName);
router.put("/updateById/:id", usersController.updateUserById);
router.put("/updateByEmail/:email", usersController.updateUserByEmail);
router.delete("/deleteUser/:id", usersController.deleteUserById);

module.exports = router;
