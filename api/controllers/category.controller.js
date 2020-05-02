const db = require('../models');
const File = db.files;
const Category = db.categories;
const User = db.users;

//TODO Think about how to handle huge volumes of data
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
        .then(result => {
            res.status(200).json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Une erreur s\'est produite lors de la récupération de la liste des catégories.'
            })
        })
};

exports.getCategoryFileListById = (req, res) => {
    const categoryId = req.params.categoryId;
    if (/^\d+$/.test(categoryId)) {
        console.log('true', /^\d+$/.test(categoryId));
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
                if (result === null) {
                    res.status(404).json({
                        success: false,
                        message: 'Catégorie introuvable.'
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        result
                    });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    true: 'Une erreur s\'est produite lors de la récupération d\'une catégorie.'
                })
            })
    } else {
        res.status(400).json({
            success: false,
            message: 'le format de paramètre n\'est pas correct.'
        });
    }
};

exports.getCategoryFileById = (req, res) => {
    const fileId = req.params.fileId;
    const categoryId = req.params.categoryId;
    if (/^\d+$/.test(fileId) && /^\d+$/.test(categoryId)) {
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
                if(!result || result.files.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: 'Fichier introuvable.'
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        result
                    });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: 'Une erreur s\'est produite lors de la récupération d\'une catégorie.'
                })
            })
    } else {
        res.status(400).json({
            success: false,
            message: 'le format de paramètre n\'est pas correct.'
        });
    }
};

exports.addCategory = async (req, res) => {
    await Category.create({
        categoryName: req.body.categoryName
    })
    .then(result => {
        res.status(200).json({
            success: true,
            result
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message:'Une erreur s\'est produite lors de la création d\'une catégorie.'
        })
    })
};

exports.editCategoryName = (req, res) => {
    Category.update(
        { categoryName: req.body.categoryName } ,
        { where: { id: req.params.categoryId }}
    ).then(() => {
        res.status(200).json({
            success: true
        })
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la modification d\'une catégorie.'
        });
    });
};

exports.updateStatusCategory = (req, res, next) => {
    Category.update(
        {status: req.body.status} ,
        {where: {id: req.params.categoryId}}
    ).then(() => {
        next();
    }).catch(err => {
        console.error(err);
        res.status(500).json(
            { error: 'Une erreur s\'est produite lors de la modification d\'une catégorie.' }
        );
    });
};

exports.getUnpublishedCategories = (req, res, next) => {
    req.body = {status: 'unpublished'};
    next();
};