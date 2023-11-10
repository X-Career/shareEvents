const mongoose = require('mongoose');

const User = mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        default: "Male"
    },
    dateOfBirth: {
        type: String,
        default: ""
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
        require: true,
        default: "member"
    },
    status: {
        type: String,
        default: "active"
    },
    address: {
        type: String,
        default: ""
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }]
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("user", User)