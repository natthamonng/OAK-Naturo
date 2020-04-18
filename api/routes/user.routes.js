const express = require("express");
const router = express.Router();const userController = require("../controllers/user.controller");
const { verifyRegistration } = require("../middlewares");

router.get('/:id', userController.getUser);

router.post('/', [ verifyRegistration.checkDuplicatedData ], userController.addProfile);

module.exports = router;
