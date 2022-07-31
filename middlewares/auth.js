const jwt = require("jsonwebtoken");

const config = require('../config.json');

const validateToken = async (req, res, next) => {
    const accessToken = req.headers.accesstoken;
    if(!accessToken) {
        return res.json({error: "Unauthorized to visit this page please login first", errorMessage: error});
    }

    try {
        const decodedData = jwt.verify(accessToken, config.secretKey);

        req.user = decodedData;
        next();
    } catch(error) {
        return res.json({error: "Wrong token has been passed not authorized to continue", errorMessage: error});
    }
}

module.exports = {
    validateToken
}