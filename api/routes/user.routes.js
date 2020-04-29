const express = require("express");
const router = express.Router();const userController = require("../controllers/user.controller");
const { passportJwt, verifyAuthority ,verifyRegistration } = require("../middlewares");

router.get('/', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin], userController.getUsers);

router.get('/:id', [passportJwt.authenticateJwt], userController.getUser);

router.post('/', [passportJwt.authenticateJwt], [verifyAuthority.isAdmin], [ verifyRegistration.checkDuplicatedData ],
    userController.addProfile);

// router.put('/:id', [passportJwt.authenticateJwt], userController.editUser);

module.exports = router;
