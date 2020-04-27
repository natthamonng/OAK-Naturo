const db = require('../models');
const File = db.files;
const Category = db.categories;
const User = db.users;

exports.getCategoryList = (req, res) => {
    const condition = req.body.status || 'published';
        
    Category.findAll({
        where: {
            status: condition
        },
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
                attributes: ['id', 'title', 'user_id', 'category_id', 'createdAt', 'updatedAt'],
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
                { message: 'Une erreur s\'est produite lors de la récupération d\'une catégorie.' }
            ]})
        })
};

exports.getCategoryFileById = (req, res) => {
    const fileId = req.params.fileId;
    const categoryId = req.params.categoryId;
    Category.findOne({
        where: {
            id: categoryId,
            status: 'published'
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
                // attributes: ['id', 'title','content', 'status', 'user_id', 'category_id', 'updatedAt'],
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
                { message: 'Une erreur s\'est produite lors de la récupération d\'une catégorie.' }
            ]})
        })
};

exports.addCategory = async (req, res, next) => {
    await Category.create({
        categoryName: req.body.categoryName
    })
    .then(category => {
        res.status(200).json(category);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la création d\'une catégorie.' }
        ]})
    })
};

exports.editCategoryName = (req, res) => {
    Category.update(
        { categoryName: req.body.categoryName } ,
        { where: { id: req.params.categoryId }}
    ).then(() => {
        res.status(200).json({success: true})
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la modification d\'une catégorie.' }]
        });
    });
};

exports.updateStatusCategory = (req, res, next) => {
    console.log(req.params.categoryId);
    Category.update(
        {status: req.body.status} ,
        {where: {id: req.params.categoryId}}
    ).then(() => {
        next();
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la modification d\'une catégorie.' }]
        });
    });
};

exports.getUnpublishedCategories = (req, res, next) => {
    req.body = {status: 'unpublished'};
    next();
};


