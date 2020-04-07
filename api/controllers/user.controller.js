require('dotenv').config();
const crypto = require('crypto');
const Mailer = require('../helpers/mailer');
const db = require('../models');
const User = db.users;

// Find a single User with an id
exports.getUser = async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id)
        .then(data => {
            if(!data)
                throw new Error();
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
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
         }).then((user) => {
            if (user === null) {
                res.status(403).json({
                    errors: [{message: 'Cet email n\'existe pas.'}]
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
                    +'Bienvenue au club. Il ne vous reste qu\'une seule étape pour terminer la création de votre compte.\n\n'
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
                 success: [{ message: 'Nouvel utilisateur créé avec succès.' }]
             });
        })
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            errors: [{ message: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' }]
        });
    });
};