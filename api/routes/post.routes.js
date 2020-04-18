const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { passportJwt, verifyAuthority } = require("../middlewares");
require('dotenv').config();
const multer = require('multer');
const upload = multer({dest: process.env.DIR_UPLOAD_POST});

router.get('/:filters', [passportJwt.authenticateJwt], postController.getPostsByFilters);

router.post('/', [passportJwt.authenticateJwt], upload.array('file'),
    postController.addNewPost, postController.getPostById);

router.put('/:postId', [passportJwt.authenticateJwt], postController.unPublishPost);

router.put('/:postId/:filter', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    postController.changeFilterPost);

module.exports = router;