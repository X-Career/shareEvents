const mongoose = require('mongoose');

const User = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        default: true
    },
    dayOfBirth: {
        type: Date,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        unique: true
    },
    userName: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "member"
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("user", User)