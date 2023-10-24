const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    },
    events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        require: true
    },
    customers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("comment", Comment)