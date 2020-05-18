const fs = require('fs');
const sharp = require('sharp');
const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Image = db.images;
const io = require('../socket');

exports.addNewPost = async (req, res, next) => {
    await Post.create({
        user_id: req.body.user_id,
        content: req.body.content,
        filter: req.body.filter
    }).then(async post => {
        for (const file of req.files) {
            const imagePath = fs.readFileSync(file.path);
            await sharp(imagePath).resize({ width: 1200 }).toBuffer()
                .then(buf => {
                    fs.writeFileSync(file.path, buf);
                });

            await Image.create({
                post_id: post.id,
                name: file.originalname.toLowerCase().split(' ').join('-'),
                image: fs.readFileSync(file.path),
            });
        }
        req.post = post;

        if (post.filter === 'pro') {
            io.getIO().of('/pro').emit("new post", {
                authorId: req.user.id,
                postId: post.id,
            });
        } else {
            io.getIO().of('/visitor').emit("new post", {
                authorId: req.user.id,
                postId: post.id,
            });
            io.getIO().of('/pro').emit("new post", {
                authorId: req.user.id,
                postId: post.id,
            });
        }

        next();
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la création de la publication.'
        });
    })
};

exports.getPostById = async (req, res) => {
    let postId;
    if (req.post) {
        postId = req.post.id
    } else if (req.comment) {
        postId = req.comment.dataValues.post_id;
    } else if (req.params.postId){
        postId = req.params.postId
    }

    await Post.findOne({
        where: {
            id: postId,
            status: 'published'
        },
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['username'],
            },
            {
                model: Comment,
                as: 'comments',
                required: false,
                where: {
                    status: 'published'
                },
                attributes: ['id', 'comment', 'createdAt', 'user_id'],
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
    }).then((result) => {
        res.status(200).json({
            success: true,
            result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la récupération d\'une publication.'
        });
    })
};

exports.getPostsByFilters = (req, res) => {
    const AVAILABLE_FILTERS = {"general": true, "witness": true, "protocol": true, "pro": true };
    let filters = (req.params.filters || "")
        .split(",")
        .filter(filterName => AVAILABLE_FILTERS[filterName] === true);

    if (req.user.role === "visitor") {
        if (filters.includes('pro')) {
            filters = ['general', 'witness', 'protocol']
        }
    }

    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = (page -1) * pageSize;
    const limit = pageSize;

    Post.findAndCountAll({
        limit,
        offset,
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
            },
            {
                model: Comment,
                as: 'comments',
                required: false,
                where: {
                    status: 'published'
                },
                attributes: ['id', 'comment', 'createdAt', 'user_id'],
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
                attributes: ['id', 'image', 'name'],
                required: false,
            }
        ],
        distinct: true
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
            message: 'Une erreur s\'est produite lors de la récupération des publications.'
        });
    })
};

exports.unpublishPost = (req, res) => {
    Post.update(
        {status: 'unpublished'} ,
        {where: {id: req.params.postId}}
    ).then(() => {
        if (req.post.filter === 'pro') {
            io.getIO().of('/pro').emit("unpublish post", {
                authorId: req.user.id,
                postId: req.post.id,
            });
        } else {
            io.getIO().of('/visitor').emit("unpublish post", {
                authorId: req.user.id,
                postId: req.post.id,
            });
            io.getIO().of('/pro').emit("unpublish post", {
                authorId: req.user.id,
                postId: req.post.id,
            });
        }
       res.status(200).json({
           success: true
       })
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la suppression de la publication.'
        });
    });
};

exports.updateFilterPost = (req, res) => {
    Post.update(
        { filter: req.params.filter },
        { where: { id: req.params.postId }}
    ).then(() => {
        if (req.post.filter === 'pro') {
            io.getIO().of('/pro').emit("update filter post", {
                postId: req.post.id,
                filter: req.params.filter,
            });
        } else {
            io.getIO().of('/visitor').emit("update filter post", {
                postId: req.post.id,
                filter: req.params.filter
            });
            io.getIO().of('/pro').emit("update filter post", {
                postId: req.post.id,
                filter: req.params.filter
            });
        }

        res.status(200).json({
            success: true
        })
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la modification d\'un filtre.'
        });
    });
};

exports.getTargetPost = (req, res, next) => {
    let postId;
    if (req.params.postId){
        postId = req.params.postId;
    } else if (req.body.postId){
        postId = req.body.postId;
    }

    Post.findOne({
        where: {id: postId}
    }).then((post) => {
        req.post = post;
        next()
    });
};