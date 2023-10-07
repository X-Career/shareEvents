const mongoose = require('mongoose');

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    }]
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("category", Category)