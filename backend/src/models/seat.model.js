const mongoose = require('mongoose');

const Seat = mongoose.Schema({
    nameOfSeat: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true,
        default: "Standard"
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