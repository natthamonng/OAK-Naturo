const db = require('../models');
const File = db.files;
const Category = db.categories;
const User = db.users;

exports.getCategoryList = (req, res) => {
    Category.findAll({
        attributes: ['id', 'categoryName'],
        order: [
            ['categoryName', 'ASC']
        ]
    })
    .then(categoryList => {
        res.status(200).json(categoryList)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la récupération de la liste des catégories.' }
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

exports.addCategory = async (req, res, next) => {
    await Category.create({
        categoryName: req.body.categoryName
    })
    .then(category => {
        // req.category = category;
        // next();
        res.status(200).json(category);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la création d\'une catégorie.' }
        ]})
    })
};

exports.getCategoryById = (req, res) => {
    const categoryId = req.category.id;
    Category.findOne({
        where: {
            id: categoryId
        },
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
    })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errors: [
                    { message: 'Une erreur s\'est produite lors de la recupération d\'une catégorie.' }
                ]})
        })
};

