const mongoose = require('mongoose');

const Seat = mongoose.Schema({
    nameOfSeat: {
        type: String,
        required: true
    },
    type: {
        type: String,
        require: true,
        default: "Standard"
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        require: true,
    }],
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("seat", Seat)