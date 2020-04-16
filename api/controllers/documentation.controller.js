const db = require('../models');
const File = db.files;
const Category = db.categories;
const User = db.users;

exports.getFiles = (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = page * pageSize;
    const limit = pageSize;
    File.findAll({
        limit,
        offset,
        include: [
            {
                model: Category,
                as: 'category'
            },
            {
                model: User,
                as: 'author',
                attributes: ['username']
            }
        ]
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la recupération des fichiers.' }
        ]})
    })
};

exports.getFileById = (req, res) => {
    const fileId = req.params.id;
    File.findOne({
        where: {
            id: fileId,
            status: 'published'
        },
        include: [
            {
                model: Category,
                as: 'category'
            },
            {
                model: User,
                as: 'author',
                attributes: ['username']
            }
        ]
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la recupération d\'un fichier.' }
        ]})
    })
};

exports.getFilesByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = page * pageSize;
    const limit = pageSize;

    File.findAll({
        limit,
        offset,
        where: {
            category_id: categoryId,
            status: 'published'
        },
        order: [
            ['title', 'ASC']
        ],
        include: [
            {
                model: Category,
                as: 'category'
            },
            {
                model: User,
                as: 'author',
                attributes: ['username']
            }
        ]
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la recupération des fichiers.' }
        ]})
    })
};

exports.createFile = async (req, res) => {
    await File.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.userId,
        category_id: req.body.categoryId
    })
    .then(file => {
        res.status(200).json(file)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la création d\'un fichier.' }
        ]})
    })
};

exports.getCategoriesWithTheirsFiles = (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = page * pageSize;
    const limit = pageSize;
    Category.findAll({
        limit,
        offset,
        order: [
            ['categoryName', 'ASC']
        ],
        include: [
            {
                model: File,
                as: 'files',
                required: false,
                where: {
                    status: 'published'
                },
                attributes: ['id', 'title', 'content', 'createdAt', 'user_id', 'category_id'],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['username'],
                    }
                ]
            }
        ]
        }
    )
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la recupération des catégories.' }
        ]})
    })
};

exports.addCategory = async (req, res) => {
    await Category.create({
        categoryName: req.body.categoryName
    })
    .then(category => {
        res.status(200).json({category})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la création d\'une catégorie.' }
        ]})
    })
};

