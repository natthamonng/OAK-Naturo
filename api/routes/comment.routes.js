const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const { passportJwt, verifyAuthority } = require("../middlewares");

router.post('/', [passportJwt.authenticateJwt], postController.getTargetPost, commentController.addNewComment, postController.getPostById);

router.put('/:postId/:commentId', [passportJwt.authenticateJwt], postController.getTargetPost, commentController.unpublishComment);

module.exports = router;