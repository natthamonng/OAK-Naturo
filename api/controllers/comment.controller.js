const db = require('../models');
const User = db.users;
const Comment = db.comments;
const io = require('../socket');

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
            res.status(200).json({
                success: true,
                result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Une erreur s\'est produite lors de la récupération des commentaires.'
            });
        })
};

exports.addNewComment = async (req, res, next) => {
    await Comment.create({
        user_id: req.body.userId,
        post_id: req.body.postId,
        comment: req.body.comment,
    }).then(comment => {
        req.comment = comment;

        if (req.post.filter === 'pro') {
            io.getIO().of('/pro').emit("new comment", {
                postId: req.post.id,
                authorId: req.user.id
            });
        } else {
            io.getIO().of('/visitor').emit("new comment", {
                postId: req.post.id,
                authorId: req.user.id
            });
            io.getIO().of('/pro').emit("new comment", {
                postId: req.post.id,
                authorId: req.user.id
            });
        }

        next();
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la création du commentaire.'
        });
    });
};

exports.unpublishComment = (req, res) => {
    Comment.update(
        {status: 'unpublished'} ,
        { where: {
            id: req.params.commentId,
            post_id: req.params.postId
        }}
    ).then(() => {

        if (req.post.filter === 'pro') {
            io.getIO().of('/pro').emit("unpublish comment", {
                postId: req.post.id,
                commentId: Number(req.params.commentId)
            });
        } else {
            io.getIO().of('/visitor').emit("unpublish comment", {
                postId: req.post.id,
                commentId: Number(req.params.commentId)
            });
            io.getIO().of('/pro').emit("unpublish comment", {
                postId: req.post.id,
                commentId: Number(req.params.commentId)
            });
        }

        res.status(200).json({
            success: true
        })
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la suppression du commentaire.'
        });
    });
};