const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const categoryController = require("../controllers/category.controller");
const { passportJwt, verifyAuthority, verifyDocumentationData } = require("../middlewares");

router.get('/', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    categoryController.getCategoriesWithTheirsFiles);

router.get('/categories', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    categoryController.getCategoryList);

router.post('/categories', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin],
    [verifyDocumentationData.checkDuplicatedCategory], categoryController.addCategory);

router.get('/files/:categoryId', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    fileController.getFilesByCategory);

router.post("/upload-files", [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    fileController.uploadFiles);

router.post('/files', [passportJwt.authenticateJwt], [verifyAuthority.isPartnerOrAdmin],
    fileController.createFile);

module.exports = router;
