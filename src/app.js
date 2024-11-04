const express = require("express");

const userRoutes = require("./app/routes/userRoutes");
const postRoutes = require("./app/routes/postRoutes");
const commentRoutes = require("./app/routes/commentRoutes");

require("./database");

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
	}

	routes() {
		this.server.use("/users", userRoutes);
		this.server.use("/users/:userId/posts", postRoutes);
		this.server.use("/posts/:postId/comments", commentRoutes);
	}
}

module.exports = new App().server;
