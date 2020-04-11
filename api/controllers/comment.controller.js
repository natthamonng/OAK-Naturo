const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.getPostComments = (req, res, next) => {
    const id = req.params.postId;

    Comment.findAll({
        where: {
            post_id: id,
            status: 'published'
        },
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['username'],
            }
        ]
    })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        })
};

exports.addNewComment = async (req, res, next) => {
    await Comment.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        comment: req.body.comment,
    }).then(comment => {
        req.comment = comment;
        next();
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la création du commentaire.' }]
        });
    });
};

exports.unPublishComment = (req, res) => {
    Comment.update(
        {status: 'unpublished'} ,
        { where: {
            id: req.params.commentId,
            post_id: req.params.postId
        }}
    ).then(comment => {
        res.status(200).json({success: true})
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la suppression du commentaire.' }]
        });
    });
};