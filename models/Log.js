const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    temperature: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    isVaccinated: {
        type: Boolean,
    }
}, { timestamps: true })

// non-clustered index on country column
LogSchema.index({ country: 1 });


const Log = mongoose.model('log', LogSchema)
module.exports = Log
