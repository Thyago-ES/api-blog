const CommentController = require("../controllers/CommentController");

const commentRoutes = require("express").Router({ mergeParams: true });

commentRoutes.get("/list", CommentController.index);
commentRoutes.get("/show/:id", CommentController.show);
commentRoutes.post("/create", CommentController.create);
commentRoutes.put("/update/:id", CommentController.update);
commentRoutes.delete("/destroy/:id", CommentController.destroy);

module.exports = commentRoutes;
