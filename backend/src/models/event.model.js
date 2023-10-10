const mongoose = require('mongoose');

const Event = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staringTime: {
        type: Date,
        require: true
    },
    endingTime: {
        type: Date,
        require: true
    },
    image: {
        type: Array,
        default: [],
        require: true
    },
    location: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    imformation: {
        type: String,
        require: true,
    },
    paymentOfMethod: {
        type: String,
        require: true
    },
    price: {
        type: Array,
        default: [],
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "commnet",
        require: true,
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true,
        default: "Uncategorized"
    }],
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "seat",
    }],
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("event", Event)