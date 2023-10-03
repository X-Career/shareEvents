const mongoose = require('mongoose');

const Order = mongoose.Schema({
    status: {
        type: String,
        require: true
    },
    amount: {
        type: String,
        require: true,
    },
    paymentOfMethod: {
        type: Array,
        require: true
    },
    events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "seat",
    }],
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("order", Order)