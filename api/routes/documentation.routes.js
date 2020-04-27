const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const categoryController = require("../controllers/category.controller");
const { passportJwt, verifyAuthority, verifyDocumentationData } = require("../middlewares");

router.get('/categories', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    categoryController.getCategoryList);

router.get('/categories/:categoryId', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    categoryController.getCategoryFileListById);

router.get('/categories/:categoryId/files/:fileId', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    categoryController.getCategoryFileById);

router.get('/deletedFiles', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    fileController.getUnpublishedFiles, fileController.getFiles);

router.post('/categories', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    [verifyDocumentationData.checkDuplicatedCategory], categoryController.addCategory);

router.post('/upload-files', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    fileController.uploadFiles);

router.post('/files', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    fileController.createFile, fileController.getFileById);

router.put('/categories/:categoryId/edit', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    [verifyDocumentationData.checkDuplicatedCategory], categoryController.editCategoryName);

router.put('/categories/:categoryId/update-status', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    categoryController.updateStatusCategory, fileController.updateStatusFile);

router.put('/categories/:categoryId/files/:fileId/edit', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    fileController.getTargetFile, fileController.editFile);

router.put('/categories/:categoryId/files/:fileId/update-status', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    fileController.updateStatusFile);

module.exports = router;
