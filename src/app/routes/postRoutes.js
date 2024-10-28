const PostController = require("../controllers/PostController");

const postRoutes = require("express").Router({ mergeParams: true });

postRoutes.get("/list", PostController.index);
postRoutes.get("/show/:id", PostController.show);
postRoutes.post("/create", PostController.create);
postRoutes.put("/update/:id", PostController.update);
postRoutes.delete("/destroy/:id", PostController.destroy);

module.exports = postRoutes;
