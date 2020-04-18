const express = require("express");
const router = express.Router();
const { verifyRegistration, passportJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");

router.post('/signup', [ verifyRegistration.checkDuplicatedData ], authController.signUpCredentials);

router.post('/signin', authController.signInCredentials);

router.get('/me', [ passportJwt.authenticateJwt], authController.getProfile);

router.post('/forgot-password', authController.forgotPassword);

router.get('/reset-password', authController.resetPassword);

router.put('/update-password', authController.upDatePasswordViaEmail);

module.exports = router;

