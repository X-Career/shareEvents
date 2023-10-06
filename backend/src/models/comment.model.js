const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evnet",
        require: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("comment", Comment)