const express = require("express");
const UserController = require("../controllers/user_controller");

const router = express.Router();
router.get("/index", UserController.index);

module.exports = router;
