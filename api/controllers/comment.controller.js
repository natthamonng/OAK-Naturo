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
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        comment: req.body.comment,
    }).then(comment => {
        req.comment = comment;
        req.body.message = "new comment";
        // Sends message to all connected users
        io.getIO().emit("notifications", {
            action: "add new comment",
            authorId: req.user.id,
            postId: req.body.post_id,
            message: `${req.user.username} vient de créer un nouveau commentaire !`,
        });
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
        // Sends message to all connected users
        io.getIO().emit("comment event", {
            action: "unpublish comment",
            postId: Number(req.params.postId),
            commentId: Number(req.params.commentId),
        });
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