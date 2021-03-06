require('dotenv').config();
const jwtStrategy = require('../passportStrategies/jwt');
const passport = require('passport');
const bcrypt = require('bcrypt');

const crypto = require('crypto');
const Mailer = require('../helpers/mailer');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const User = db.users;

const BCRYPT_SALT_ROUNDS = 8;

exports.signUpCredentials = (req,res) => {
    // Save new User to database
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)
    }).then(data => {
        res.status(200).json({
            success: true,
            message: 'Nouvel utilisateur créé avec succès.'
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' }
        );
    });
};

exports.signInCredentials = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe invalide.'
            });
        }
        req.user = user;
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        const token = jwtStrategy.createNewJwt(payload);

        return res.status(200).json({
            success: true,
            token,
            user: payload
        });
    })(req, res);
};

exports.getProfile = (req, res) => {
    const userId = req.user.id;
    console.log('getProfile with ID: ' + userId);
    User.findByPk(
        userId,
        { attributes: {
            exclude: [
                'password',
                'resetPWDToken',
                'resetPWDExpires',
                'createdAt',
                'updatedAt'
            ]
        }})
        .then(data => {
            const token = jwtStrategy.createNewJwt(data.dataValues);
            res.status(200).json({
                success: true,
                user: data,
                token
            });
        }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la récupération les données.'
        });
    })
};

exports.forgotPassword = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then(async(user) => {
        if (user === null) {
            res.status(403).json({
                success: false,
                message: 'Cette adresse mail n\'existe pas.'
            })
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            user.update({
                resetPWDToken: token,
                resetPWDExpires: Date.now() + 3600000, //1hr
            });

            const mailer = new Mailer();
            await mailer.sendEmail(
                user,
                'Réinitialisation de mot de passe.',
                `Bonjour, ${user.username} !\n\n`
                + 'Vous recevez cet e-mail car vous (ou quelqu\'un d\'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n'
                + 'Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus dans l\'heure suivant sa réception:\n\n'
                + `${process.env.WEB_URL}/reset-password/${token}\n\n`
                + 'Si vous ne l\'avez pas demandée, veuillez ignorer cet e-mail et votre mot de passe restera identique.\n',
            ).then(() => {
                res.status(200).json({
                    success: true,
                    message: 'Email de récupération envoyé.'
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'Une erreur s\'est produite. Veuillez réessayer plus tard.'
                });
            })
        }
    });
};

exports.resetPassword = async (req, res) => {
    await User.findOne({
        where: {
            resetPWDToken: req.query.resetPWDToken,
            resetPWDExpires: {
                [Op.gt]: Date.now(),
            },
        },
    }).then((user) => {
        if (user == null ) {
            res.status(403).json({
                success: false,
                message: 'Le lien de réinitialisation du mot de passe n\'est pas valide ou a expiré.'
            });
        } else {
            res.status(200).json({
                success: true,
                username: user.username
            });
        }
    });
};

exports.upDatePasswordViaEmail = async (req, res) => {
    await User.findOne({
        where: {
            username: req.body.username,
            resetPWDToken: req.body.resetPWDToken,
            resetPWDExpires: {
                [Op.gt]: Date.now(),
            },
        },
    }).then( async user => {
        if (user === null) {
            res.status(403).json({
                success: false,
                message: 'Le lien de réinitialisation du mot de passe n\'est pas valide ou a expiré.'
            });
        } else if (user) {
            const hashedPassword = bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS);
                    await user.update({
                        password: hashedPassword,
                        resetPWDToken: null,
                        resetPWDExpires: null
                    })
                .then(() => {
                    res.status(200).json({
                        success: true
                    });
                });
        } else {
            res.status(500).json({
                success: false,
                message: 'Une erreur s\'est produite.'
            });
        }
    });
};
