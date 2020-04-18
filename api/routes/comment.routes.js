const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const { passportJwt, verifyAuthority } = require("../middlewares");

router.post('/', [passportJwt.authenticateJwt], commentController.addNewComment, postController.getPostById);

router.put('/:postId/:commentId', [passportJwt.authenticateJwt], commentController.unPublishComment);

module.exports = router;