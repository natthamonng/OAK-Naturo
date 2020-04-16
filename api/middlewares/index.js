const verifyRegistration = require("./verifyRegistration");
const passportJwt = require("./passportJwt");
const verifyAuthority = require("./verifyAuthority");


module.exports = {
    verifyRegistration,
    //passports
    passportJwt,

    verifyAuthority,
};