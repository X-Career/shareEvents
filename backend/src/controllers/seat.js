const seatModel = require("../models/seat.model.js");
const seatValidator = require("../validations/seat.js");
const userModel = require("../models/user.model.js");
const eventModel = require("../models/event.model.js");

const createSeat = async (req, res) => {
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

const getAllSeats = async (req, res) => {
    try {
        const dataSeats = await seatModel.find({}).populate("events");
        if (!dataSeats && dataSeats.length === 0) {
            return res.status(404).json({ message: "Seats are not found" });
        }

        // console.log(dataSeats);
        const seats = [];
        for (i = 0; i < dataSeats.length; i++) {
            seats.push(String(dataSeats[i]._id));
        }
        
        return res.status(200).json({
            message: "Seats are successfully",
            seats: seats,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllSeatsStandard = async (req, res) => {
    try {
        const idEvent = req.params.id;
        const dataSeatsStandard = await seatModel.find({type: "Standard"}).populate({
            path: "events",
            match: { _id: idEvent}
        });

        console.log(dataSeatsStandard)
    } catch (error) {
        
    }
};

const getSeatById = async (res, req) => {
    try {
        const idSeat = req.params.id;
        const data = await seatModel.findById(idSeat).populate("events")

        if (!data) {
            return res.status(404).json({ message: "Seat is not found" });
        }
        return res.status(200).json({
            message: "Seat is successfully",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }    
};

const updateSeat = async (res, req) => {
    try {
        const { error } = seatValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const idSeat = req.params.id;
        const data = await  seatModel.findByIdAndUpdate(idSeat, req.body, { new: true })
        if (!data) {
            return res.status(404).json({
                message: "Updating Seat is not successful",
            });
        }
        return res.status(200).json({
            message: "Updating Seat is successful",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteSeat = async (res, req) => {
    try {
        const idSeat = req.params.id;
        const data = await categoryModel.findByIdAndDelete(idSeat)

        if (!data) {
            return res.status(404).json({
                message: "Deleting Seat is not successful",
            });
        }
        return res.status(200).json({
            message: "Deleting Seat is successful",
            data
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createSeat,
    getAllSeats,
    getSeatById,
    updateSeat,
    deleteSeat
}
