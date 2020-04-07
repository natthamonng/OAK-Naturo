const passport = require('passport');
const passportLocal = require('passport-local');
const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');

class LocalStrategy {

    constructor() {
        this._options = {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        };
    }

    get name() {
        return 'local';
    }

    authenticate(req, res) {
        passport.use('local', new passportLocal.Strategy(this._options, function(req, username, password, callback) {
            User.findOne({
                where: {
                     email: username
                }
            }).then(user => {
                if(!user) {
                    console.log('LocalStrategy: Invalid email.')
                    callback(true, false);
                    return;
                }

                if(!bcrypt.compareSync(password, user.password)) {
                    console.log('LocalStrategy: Invalid password.')
                    callback(true, false);
                    return;
                }

                console.log('LocalStrategy: Successfully.');
                callback(false, user);
            });
        }));
    }
}

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = LocalStrategy;
