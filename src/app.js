const express = require("express");

const userRoutes = require("./app/routes/userRoutes");

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
	}
}

module.exports = new App().server;
