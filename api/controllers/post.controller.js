const fs = require('fs');
const sharp = require('sharp');
const db = require('../models');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Image = db.images;
const io = require('../socket');

exports.addNewPost = async (req, res, next) => {
    let location;
    if(req.body.filter === 'general' || req.body.filter === 'witness' || req.body.filter === 'protocol') {
        location = 'le forum de discussion'
    } else if (req.body.filter === 'pro') {
        location = 'l\'espace pro'
    }
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
        req.body.message = "new post";
        // Sends message to all connected users
        io.getIO().emit("notifications", {
            action: "add new post",
            authorId: req.user.id,
            postId: post.id,
            location,
            message: `${req.user.username} vient de créer une nouvelle publication dans ${location} !`,
        });
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
    console.log(postId);
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
        console.log(req.user.username, err);
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
    console.log('FILTERS FROM PARAMS:' + filters);

    if (req.user.role === "visitor") {
        if (filters.includes('pro')) {
            filters = ['general', 'witness', 'protocol']
        }
    }
    console.log('VERIFIED FILTERS:' + filters);
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
        // Sends message to all connected users
        io.getIO().emit("post event", {
            action: "unpublish post",
            postId: Number(req.params.postId),
        });
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
        {filter: req.params.filter} ,
        {where: {id: req.params.postId}}
    ).then(() => {
        // Sends message to all connected users
        io.getIO().emit("post event", {
            action: "update filter post",
            postId: Number(req.params.postId),
            filter: req.params.filter
        });
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