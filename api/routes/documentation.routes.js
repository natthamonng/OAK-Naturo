const documentationController = require('../controllers/documentation.controller');
const { passportJwt, verifyAuthority } = require('../middlewares');

module.exports = app => {
    app.get('/api/categories', [passportJwt.authenticateJwt],
        [verifyAuthority.isPartnerOrAdmin], documentationController.getCategoriesWithTheirsFiles);

    app.get('/api/files/:categoryId', [passportJwt.authenticateJwt],
        [verifyAuthority.isPartnerOrAdmin], documentationController.getFilesByCategory);

    app.post('/api/files', [passportJwt.authenticateJwt],
        [verifyAuthority.isPartnerOrAdmin], documentationController.createFile);

    app.post('/api/categories', [passportJwt.authenticateJwt],
        [verifyAuthority.isAdmin], documentationController.addCategory);

};