const fs = require('fs');
const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Image = db.images;

exports.addNewPost = async (req, res, next) => {
    await Post.create({
        user_id: req.body.user_id,
        content: req.body.content,
        filter: req.body.filter
    }).then(async post => {
        req.post = post;
        // TODO: resize uploaded image to 1200px width
        for (const file of req.files) {
            await Image.create({
                post_id: post.id,
                name: file.originalname.toLowerCase().split(' ').join('-'),
                image: fs.readFileSync(file.path),
            });
        }
    }).then(() => {
        next();
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la création de la publication.' }]
        });
    })
};

exports.getPostById = async (req, res) => {
    let postId;
    if (req.post) {
        postId = req.post.id
    } else if (req.comment) {
        postId = req.comment.dataValues.post_id;
    }
    await Post.findOne({
        where: {
            id: postId
        },
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['username'],
            }, {
                model: Comment,
                as: 'comments',
                attributes: ['id', 'comment'],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['username'],
                    }
                ]
            },
            {
                model: Image,
                as: 'images',
                attributes: ['id', 'image', 'name']
            }
        ]
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};

exports.getPostsByFilters = async (req, res) => {
    const AVAILABLE_FILTERS = {"general": true, "witness": true, "protocol": true, "pro": true };
    let filters = (req.params.filters || "")
        .split(",")
        .filter(filterName => AVAILABLE_FILTERS[filterName] === true);
    console.log('FILTERS FROM PARAMS:' + filters);

    if (req.user.role === "visitor") {
        if (filters.includes('pro')) {
            filters = ['general', 'witness', 'protocol']
        }
    }
    console.log('VERIFIED FILTERS:' + filters);

    await Post.findAll({
        where: {
            filter: filters
        },
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['username'],
            }, {
                model: Comment,
                as: 'comments',
                attributes: ['id', 'comment', 'createdAt'],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['username'],
                    }
                ]
            },
            {
                model: Image,
                as: 'images',
                attributes: ['id', 'image', 'name']
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
