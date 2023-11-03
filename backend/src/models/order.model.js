const mongoose = require('mongoose');

const Order = mongoose.Schema({
    status: {
        type: String,
        require: true,
        default: "chưa thanh toán"
    },
    amount: {
        type: Number,
        require: true,
    },
    paymentOfMethod: {
        type: String,
        require: true
    },
    events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    },
    customers: {
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