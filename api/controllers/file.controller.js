const multer = require("multer");
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
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

exports.uploadFiles = (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
};

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
    const fileId = req.params.fileId;
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
    }).then(file => {
            res.status(200).json(file)
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
               category_id: req.body.categoryId
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
    File.update(
        {status: req.query.status} ,
        {where: {id: req.params.fileId}}
    ).then(() => {
        res.status(200).json({success: true})
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la suppression du fichier.' }]
        });
    });
};
