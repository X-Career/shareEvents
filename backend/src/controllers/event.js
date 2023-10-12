const eventModel = require("../models/event.model");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");
const commentModel = require("../models/comment.model");
const seatModel = require("../models/seat.model");
const { eventValidator } = require("../validations/event.js");
const dotenv = require("dotenv");

dotenv.config();

const getAllEvents = async (req, res) => {
    try {
        const data = await eventModel.find({}).populate({path: "categories"}).populate({path: "users"})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getDetailEvent = async (req, res) => {
};

const createEvent = async (req, res) => {
};

const updateEvent = async (req, res) => {
};

const deleteEvent = async (req, res) => {
};

module.exports = {
    getAllEvents,
    getDetailEvent,
    createEvent,
    updateEvent,
    deleteEvent    
}
