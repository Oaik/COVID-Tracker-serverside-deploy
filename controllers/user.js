// dependencies
const jwt = require("jsonwebtoken");

// models
const User = require('../models/User');
const Log = require('../models/Log');

const config = require('../config.json');

const showCurrentUser = async (req, res) => {
    Log.find({user_id: req.user.id}, (error, logs) => {
        if(error) {
            return res.json({error: "Error while getting logs of the currentUser", errorMessage: error});
        }

        const userInfo = {
            ...req.user,
            logs: logs
        }
    
        return res.json(userInfo);
    });

}

const updateCurrentUser = async (req, res) => {
    const paramId = req.params.id;

    if(paramId !== req.user.id) {
        return res.json({error: "Unauthorized to update the profile"});
    }
    
    User.findByIdAndUpdate(req.user.id, {name: req.body.name}, {new: true})
        .then((user) => {
            jwt.sign(
                {
                    "id": user._id,
                    "name": user.name,
                    "email": user.email
                }, 
                config.secretKey,
                (error, token) => {
                    if(error) {
                        return res.json({error: "Error while signing the jwt in updateCurrentUser", errorMessage: error});
                    }

                    return res.json({
                        accessToken: token,
                        user: {
                            "id": user._id,
                            "name": user.name,
                            "email": user.email
                        }
                    });
            });
        })
        .catch((error) => {
            return res.json({error: "Error while find user and update in updateCurrentUser", errorMessage: error});
        });
}

module.exports = {
    showCurrentUser,
    updateCurrentUser
}