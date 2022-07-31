const axios = require("axios");

const Log = require('../models/Log');

const showLogs = async (req, res) => {
    const countryName = req.query.country;
    if(countryName) {
        return Log
            .find({countryName})
            .then(logs => res.json(logs))
            .catch(error => res.json({error: `Could not fetch data with country ${countryName}`, errorMessage: error}))
    }
    
    return Log
        .find({})
        .then((data) => res.json(data))
        .catch((error) => res.json({error: "Error in showLogs while fetching all logs", errorMessage: error}));
}

const createLog = async (req, res) => {
    let { latitude, longitude} = req.body;

    return axios
        .get(`http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=oaik`)
        .then((response) => {
            // the api could not find the country with this (latitude and longitude) so it will return status object with error message
            if(response.data.status) {
                return res.json({error: response.data.status.message});
            }

            const countryList = {
                countryName: response.data.countryName,
                countryCode: response.data.countryCode
            }

            const newLog = new Log({
                ...req.body,
                user_id: req.user.id,
                ...countryList
            })

            return newLog
                .save()
                .then(() => res.json({}))
                .catch((error) => res.json({error: "Error while saving the new log", errorMessage: error}));
            
        })
        .catch((error) => {
            return res.json({error: "error in the genoname api while finding the country", errorMessage: error});
        })
}

module.exports = {
    showLogs,
    createLog
}