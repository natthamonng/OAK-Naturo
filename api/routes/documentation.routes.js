const documentationController = require('../controllers/documentation.controller');
const { passportJwt, verifyAuthority, verifyDocumentationData } = require('../middlewares');

module.exports = app => {
    app.get('/api/documentation', [passportJwt.authenticateJwt],
        [verifyAuthority.isPartnerOrAdmin], documentationController.getCategoriesWithTheirsFiles);

    app.get('/api/files/:categoryId', [passportJwt.authenticateJwt],
        [verifyAuthority.isPartnerOrAdmin], documentationController.getFilesByCategory);

    app.post('/api/files', [passportJwt.authenticateJwt],
        [verifyAuthority.isPartnerOrAdmin], documentationController.createFile);

    app.post('/api/documentation/categories', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
        [verifyDocumentationData.checkDuplicatedCategory], documentationController.addCategory,
        documentationController.getCategoryById);
};