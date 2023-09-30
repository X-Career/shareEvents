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
        default: ""
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
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
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("user", User)