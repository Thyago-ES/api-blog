const AuthController = require("../controllers/AuthController");

const authRoutes = require("express").Router();

authRoutes.post("/login", AuthController.login);

module.exports = authRoutes;
