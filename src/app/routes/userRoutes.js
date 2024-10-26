const UserController = require("../controllers/UserController");

const userRoutes = require("express").Router();

userRoutes.get("/list", UserController.index);
userRoutes.get("/show/:id", UserController.show);
userRoutes.post("/register", UserController.create);
userRoutes.put("/update/:id", UserController.update);
userRoutes.delete("/destroy/:id", UserController.destroy);

module.exports = userRoutes;
