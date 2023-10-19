const { array } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Event = mongoose.Schema({
    nameE: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    endingTime: {
        type: String,
        require: true
    },
    startingTime: {
        type: String,
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
        require: true,
        default: "Draft"
    },
    information: {
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
        ref: "comment"
    }],
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true,
        default: "Uncategorized"
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "seat",
        require: true
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }]
}, {
    versionKey: false,
    timestamps: true,
})

Event.plugin(mongoosePaginate);

module.exports = mongoose.model("event", Event)