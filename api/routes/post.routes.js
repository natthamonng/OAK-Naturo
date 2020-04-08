const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const { passportJwt } = require('../middlewares');

const multer = require('multer');
const upload = multer({dest: 'uploads/'})

module.exports = app => {

    app.get('/api/posts/:filters', [passportJwt.authenticateJwt], postController.getPostsByFilters);

    app.get('/api/posts/:postId/comments', commentController.getPostComments);

    app.post('/api/posts', [passportJwt.authenticateJwt], upload.array('file', 10),
        postController.addNewPost, postController.getPostById);

    app.post('/api/comment', commentController.addNewComment);

};