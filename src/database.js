const { Sequelize } = require("sequelize");
const config = require("./config/database");

const User = require("./app/models/User");
const Post = require("./app/models/Post");
const Comment = require("./app/models/Comment");

const models = [User, Post, Comment];

class Database {
	constructor() {
		this.connection = new Sequelize(config);
		this.init();
		this.associate();
	}

	init() {
		models.forEach((model) => model.init(this.connection));
	}

	associate() {
		models.forEach((model) => {
			if (model.associate) {
				model.associate(this.connection.models);
			}
		});
	}
}

module.exports = new Database();
