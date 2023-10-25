const seatModel = require("../models/seat.model.js");
const seatValidator = require("../validations/seat.js");
const userModel = require("../models/user.model.js");

const createSeat = async (res, req) => {
    try {
        const { error } = seatValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const data = await seatModel.create(req.body)
        if (!data) {
            return res.status(404).json({
                message: "Creating seat is not successful",
            });
        }
        return res.status(200).json({
            message: "Creating seat is successful",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllSeat = async (res, req) => {
    try {
        
    } catch (error) {
        
    }
};

const getSeatById = async (res, req) => {
};

const updateSeat = async (res, req) => {
};

const deleteSeat = async (res, req) => {
};

module.exports = {
    createSeat,
    getAllSeat,
    getSeatById,
    updateSeat,
    deleteSeat
}
