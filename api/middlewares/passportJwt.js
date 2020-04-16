const passport = require('passport');

authenticateJwt = (req, res, next) => {
    return passport.authenticate('jwt', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                errors: [{ message: 'JWT Error.'}]
            });
        }
        req.user = user;
        next()
    })(req, res, next);
};

const passportJwt = {
    authenticateJwt: authenticateJwt,
};

module.exports = passportJwt;


