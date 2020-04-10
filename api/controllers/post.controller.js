const fs = require('fs');
const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Image = db.images;
//TODO: response success/error message

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
    } else if (req.params.postId) {
        console.log('hello')
    }
    await Post.findOne({
        where: {
            id: postId,
            status: 'published'
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
                where: {
                    status: 'published'
                },
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
            filter: filters,
            status: 'published'
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
                where: {
                    status: 'published'
                },
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

exports.unPublishPost = (req, res) => {
    Post.update(
        {status: 'unpublished'} ,
        {where: {id: req.params.postId}}
    ).then(() => {
       res.status(200).json({success: true})
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la suppression de la publication.' }]
        });
    });
};