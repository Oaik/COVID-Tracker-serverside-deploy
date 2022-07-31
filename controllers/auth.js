// dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// models
const User = require('../models/User');

// others
const config = require('../config.json');

const tokenVerfication = (req, res) => {
    return res.json({
        ...req.user
    });
}

const register = (req, res) => {
    bcrypt.hash(req.body.password, 5).then((hashedPassword) => {
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        newUser.save((error) => {
            if(error) {
                return res.json({error: `Error while creating user ${error.message}`, errorMessage: error});
            }

            return res.json({});        
        });
    }).catch( (error) => {
        console.error("Error while hashing the passwored", error);

        return res.json({error: "Error while hashing the password of the user", errorMessage: error});
    });
}

const login = (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(!user) {
            return res.json({error: "Email does not exists"});
        }

        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if(!isMatch) {
                return res.json({error: "Wrong password"});
            }

            jwt.sign(
                {
                "id": user._id,
                "name": user.name,
                "email": user.email
                }, 
                config.secretKey,
                (error, token) => {
                    if(error) {
                        return res.json({error: "Error while signing the jwt in login", errorMessage: error});
                    }
                    
                    return res.json({
                        accessToken: token,
                        id: user._id,
                        name: user.name
                    });
                } 
            );


        }).catch( (error) => {
            return res.json({error: "Error while comparing the password of the user", errorMessage: error});
        });
        
    }).catch((error) => {
        return res.json({error: "Login Falied while finding user", errorMessage: error});
    })
}

const logout = (req, res) => {
    req.user = null;
    res.json({});
}

module.exports = {
    tokenVerfication,
    register,
    login,
    logout
}