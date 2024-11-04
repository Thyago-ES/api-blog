const express = require("express");

const authRoutes = require("./app/routes/authRoutes");
const userRoutes = require("./app/routes/userRoutes");
const postRoutes = require("./app/routes/postRoutes");
const commentRoutes = require("./app/routes/commentRoutes");

const authMiddleware = require("./app/middlewares/authMiddleware");

require("./database");

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
		this.server.use(authMiddleware);
	}

	routes() {
		this.server.use("/auth", authRoutes);
		this.server.use("/users", userRoutes);
		this.server.use("/users/:userId/posts", postRoutes);
		this.server.use("/posts/:postId/comments", commentRoutes);
	}
}

module.exports = new App().server;
