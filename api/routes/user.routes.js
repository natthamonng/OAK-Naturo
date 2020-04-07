const userController = require('../controllers/user.controller');
const { verifyRegistration } = require('../middlewares');

module.exports = app => {

    app.get('/api/users/:id', userController.getUser);

    app.post('/api/users', [ verifyRegistration.checkDuplicatedData ], userController.addProfile);

};