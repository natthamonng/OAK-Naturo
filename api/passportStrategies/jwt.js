require('dotenv').config();
const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;

class JwtStrategy {

    constructor() {
        this._options = {
            secret: process.env.JWT_SECRET,
            issuer: process.env.JWT_ISSUER,
            // audience: process.env.JWT_AUDIENCE
        };
    }

    get name() {
        return 'jwt';
    }

     authenticate(req, cb) {
        const self = this;

        // Get token from header
        let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        console.log('Token from request: ' + token);

        // Check if not token
        if (!token) {
            console.log('NO TOKEN PROVIDED');
            return self.error(new Error('No auth token provided'));
        }

        jwt.verify(token, self._options.secret, function (jwt_err, payload) {
            if (jwt_err) {
                return self.error(jwt_err);
            } else {
                try {
                    self.success(payload);
                    console.log('VERIFY TOKEN SUCCESSFULLY.');
                } catch (ex) {
                    self.error(ex);
                    console.log(ex + 'VERIFY TOKEN FAILED.');
                }
            }
        });
    }

    static createNewJwt(user) {
        const expiresIn = '365d';
        const audience = config.audience;
        const issuer = config.issuer;
        const secret = config.secret;

        return jwt.sign({user}, secret, {
            expiresIn: expiresIn,
            audience: audience,
            issuer: issuer,
            subject: user.id.toString()
        });
    }

}

module.exports = JwtStrategy;