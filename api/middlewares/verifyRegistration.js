const db = require('../models');
const User = db.users;

checkDuplicatedData = (req, res, next) => {
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).json({
                success: false,
                message: 'Cet identifiant existe déjà.'
            });
            return;
        }

        //email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).json({
                    success: false,
                    message: 'Cet email existe déjà.'
                });
                return;
            }

            next();
        });
    });
};

const verifyRegistration = {
    checkDuplicatedData: checkDuplicatedData
};

module.exports = verifyRegistration;
