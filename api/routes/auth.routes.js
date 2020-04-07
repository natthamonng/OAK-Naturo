const { verifyRegistration, passportJwt } = require('../middlewares');
const authController = require('../controllers/auth.controller');

module.exports = app => {

    app.post('/api/auth/signup', [ verifyRegistration.checkDuplicatedData ], authController.signUpCredentials);

    app.post('/api/auth/signin', authController.signInCredentials);

    app.get('/api/auth/me', [ passportJwt.authenticateJwt], authController.getProfile);

    app.post('/api/auth/forgot-password', authController.forgotPassword);

    app.get('/api/auth/reset-password', authController.resetPassword);

    app.put('/api/auth/update-password', authController.upDatePasswordViaEmail);

};

