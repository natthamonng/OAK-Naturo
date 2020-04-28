const multer = require("multer");
const sharp = require("sharp");
const fs = require('fs');
const path = require("path");
require('dotenv').config();
const db = require('../models');
const File = db.files;
const Category = db.categories;
const User = db.users;

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.DIR_UPLOAD_FILE);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    //TODO fileResize
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
        return cb(('Ce type de fichier n’est pas pris en charge. seuls jpg, png, mp4 sont autorisés.'), false);
    } else {
        cb(null, true)
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file");

exports.uploadFiles = (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.status(400).json({ success: false, err });
        } else {
            const imagePath = fs.readFileSync(req.file.path);
            sharp(imagePath).resize({ width: 1200 }).toBuffer()
                .then(buf => {
                    fs.writeFileSync(req.file.path, buf);
                });
            return res.status(200).json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
        }
    });
};

exports.getFiles = (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = page * pageSize;
    const limit = pageSize;
    const condition = req.body.status || 'published';

    File.findAll({
        limit,
        offset,
        where: {'status': condition},
        order: [
            ['updatedAt', 'DESC']
        ],
        attributes: ['id', 'title', 'createdAt', 'updatedAt'],
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'categoryName'],
                where: {'status': 'published'}
            },
            {
                model: User,
                as: 'author',
                attributes: ['id', 'username']
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
    const fileId = req.file.dataValues.id;
    File.findOne({
        where: {
            id: fileId,
            status: 'published'
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['categoryName']
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

exports.createFile = async (req, res, next) => {
    await File.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.userId,
        category_id: req.body.categoryId
    }).then(file => {
            req.file = file;
            next();
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errors: [
            { message: 'Une erreur s\'est produite lors de la création du fichier.' }
        ]})
    })
};

exports.getTargetFile = (req, res, next) => {
    File.findOne({
        where: {id: req.params.fileId}
    }).then((file) => {
            req.file = file;
            next()
        }
    );
};

exports.editFile = (req, res) => {
   if ( req.file.user_id !== req.user.id && req.user.role !== 'admin') {
       res.status(401).json({ error: 'Non autorisé.'})
   } else {
       File.update(
           {
               title: req.body.title,
               content: req.body.content,
               category_id: req.params.categoryId
           } ,
           {where: {id: req.params.fileId}}
       ).then(() => {
           res.status(200).json({success: true})
       }).catch(err => {
           console.error(err);
           res.status(500).json({
               errors: [{ message: 'Une erreur s\'est produite lors de la modification du fichier.' }]
           });
       });
   }
};

exports.updateStatusFile = (req, res) => {
    let condition;
    if (req.params.fileId){
        condition = {id: req.params.fileId}
    } else if (req.params.categoryId){
        condition = {category_id: req.params.categoryId}
    }
    File.update(
        {status: req.body.status},
        {where: condition}
    ).then(() => {
        res.status(200).json({success: true})
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la modification du fichier.' }]
        });
    });
};

exports.getUnpublishedFiles = (req, res, next) => {
    req.body = {status: 'unpublished'};
    next();
};
