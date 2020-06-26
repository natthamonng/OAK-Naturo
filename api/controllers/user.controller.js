require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Mailer = require('../helpers/mailer');
const db = require('../models');
const User = db.users;

const BCRYPT_SALT_ROUNDS = 8;

// Find a single User with an id
exports.getUser =  (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if(!data) throw new Error();
            res.send({
                success: true,
                user: data
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "Error retrieving User with id= " + id
            });
        });
};

exports.getUsers = (req, res) => {

    User.findAll({
        order: [
            ['username', 'ASC']
        ],
        attributes: ['id', 'username', 'email', 'role', 'createdAt']
    })
        .then(data => {
            if(!data) throw new Error();
            res.status(200).send({
                success: true,
                users: data
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "Error retrieving Users."
            });
        });
};

exports.addProfile = async (req, res, next) => {
    // Save new user to database (waiting for password creation)
    await User.create({
        email: req.body.email,
        username: req.body.username,
        role: req.body.role,
    }).then(data => {
         User.findOne({
            where: {
                email: req.body.email,
            },
         }).then(user => {
            if (user === null) {
                res.status(403).json({
                    success: false,
                    message: 'Cet email n\'existe pas.'
                })
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                user.update({
                    resetPWDToken: token,
                    resetPWDExpires: Date.now() + 3600000, //1hr
                });

                const mailer = new Mailer();
                mailer.sendEmail(
                    user,
                    'Réinitialisation de mot de passe.',
                    `Bonjour, ${user.username} !\n\n`
                    +'Bienvenue. Il ne vous reste qu\'une seule étape pour terminer la création de votre compte.\n\n'
                    + 'Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour réinitialiser votre mot de passe dans l\'heure suivant sa réception:\n\n'
                    + `${process.env.WEB_URL}/reset-password/${token}\n\n`
                    + 'A bientôt!'
                ).then((response) => {
                    next(response);
                }).catch((err) => {
                    next(err);
                })
            }
             res.status(200).json({
                 success: true,
                 message: 'Nouvel utilisateur créé avec succès.'
             });
        })
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la création de l\'utilisateur.'
        });
    });
};

exports.resetPassword = (req, res) => {
    User.findOne({
        where: {
            id: req.user.id,
        },
    }).then((userInfo) => {
        bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
                userInfo.update({
                    password: hashedPassword,
                });
            })
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: 'Mot de passe mis à jour.'
                });
            });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la modification du mot de passe.'
        });
    });
};

exports.editProfile = (req, res, next) => {
    let condition;
    if (req.body.username){
        condition = {username: req.body.username}
    }
    if (req.body.email){
        condition = {email: req.body.email}
    }
    User.findOne({
        where: {
            id: req.user.id,
        },
    }).then((userInfo) => {
        userInfo.update(condition)
            .then(() => {
                next();
            });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la modification du compte.'
        });
    });
};

exports.editUserProfileByAdmin = (req, res) => {
    console.log(req.params.id);
    User.findOne({
        where: {
            id: req.params.id,
        },
    }).then((userInfo) => {
        userInfo.update({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        })
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: 'Profile d\'utilisateur mis à jour.'
                });
            });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la modification du compte.'
        });
    });
};