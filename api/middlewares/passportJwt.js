const passport = require('passport');

authenticateJwt = (req, res, next) => {
    return passport.authenticate('jwt', {session: false}, (err, data) => {
        if (err || !data) {
            return res.status(401).json({
                success: false,
                message: 'No auth token provided.'
            });
        }
        req.user = data.user;
        next()
    })(req, res, next);
};

const passportJwt = {
    authenticateJwt: authenticateJwt,
};

module.exports = passportJwt;


