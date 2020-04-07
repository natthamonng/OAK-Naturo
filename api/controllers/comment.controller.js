const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.getPostComments = (req, res, next) => {
    const id = req.params.postId;

    Comment.findAll({
        where: {
            post_id: id
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

exports.addNewComment = (req, res, next) => {
    Comment.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        comment: req.body.comment,
    }).then(data => {
        res.status(200).json({
            success: [{ message: 'Nouveau commentaire créé avec succès.' }]
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la création du commentaire.' }]
        });
    });
};