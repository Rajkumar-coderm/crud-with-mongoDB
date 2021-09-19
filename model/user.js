const { Admin, Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true
    },
    Middle_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    }, Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength:6
    },
    Role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    Department: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = new mongoose.model('userProfile', userSchema)