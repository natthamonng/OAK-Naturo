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

exports.getCategoryFileListById = (req, res) => {
    const categoryId = req.params.categoryId;
    Category.findOne({
        where: {
            id: categoryId
        },
        order: [
            [{model: File, as: 'files'}, 'updatedAt', 'DESC']
        ],
        include: [
            {
                model: File,
                as: 'files',
                required: false,
                where: {
                    status: 'published'
                },
                attributes: ['id', 'title', 'user_id', 'category_id', 'updatedAt'],
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
            if(result === null) {
                res.status(404).json({ errors: [
                        { message: 'Catégorie introuvable.' }
                    ]});
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errors: [
                    { message: 'Une erreur s\'est produite lors de la recupération d\'une catégorie.' }
                ]})
        })
};

exports.getCategoryFileById = (req, res) => {
    const fileId = req.params.fileId;
    const categoryId = req.params.categoryId;
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
                    status: 'published',
                    id: fileId,
                },
                attributes: ['id', 'title','content', 'status', 'user_id', 'category_id', 'updatedAt'],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'username'],
                    }
                ]
            }
        ]
    })
        .then(result => {
            if(result.files.length === 0) {
                res.status(404).json({ errors: [
                        { message: 'Fichier introuvable.' }
                    ]});
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errors: [
                    { message: 'Une erreur s\'est produite lors de la recupération d\'une catégorie.' }
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



