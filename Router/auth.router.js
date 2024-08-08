const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth.controller");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/user/:id", authController.getUser);
router.put("/user/:id", authController.updateUser);



module.exports = router;