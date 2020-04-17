const verifyRegistration = require("./verifyRegistration");
const passportJwt = require("./passportJwt");
const verifyAuthority = require("./verifyAuthority");
const verifyDocumentationData = require("./VerifyDocumentationData");

module.exports = {
    verifyRegistration,
    passportJwt,
    verifyAuthority,
    verifyDocumentationData
};