const orderModel = require("../models/order.model.js");
const orderValidator = require("../validations/order.js");
const userModel = require("../models/user.model.js");
const seatModel = require("../models/seat.model.js");
const eventModel = require("../models/event.model.js");

const createOrder = async (req, res) => {
    const data = req.body;
    const idEvent = req.params.id;
    const idUser = req.user?._id;
    try {
        const { error } = orderValidator.validate(data);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const dataOrder = await orderModel.create({
            ...data,
            customers: idUser,
            events: idEvent,
        })
        
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

module.exports = {
    createOrder,
}