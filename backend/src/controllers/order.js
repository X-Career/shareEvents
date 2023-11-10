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
                message: "Creating order is not successful",
            });
        }

        const updateEvents = await eventModel.findByIdAndUpdate(dataOrder.events, {
            $addToSet: {
                orders: dataOrder._id,
            },
        });

        if (!updateEvents) {
            return res.status(404).json({
                message: "Thêm order cho sự kiện không thành công!",
            });
        }

        const updateUsers = await userModel.findByIdAndUpdate(dataOrder.customers, {
            $addToSet: {
                orders: dataOrder._id,
            }
        });

        if (!updateUsers) {
            return res.status(404).json({
                message: "Thêm order cho user không thành công!",
            }); 
        }

        return res.status(200).json({
            message: "Creating order is successful",
            datas: dataOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const {
            _page = 1,
            _limit = 40,
            _sort = "createdAt",
            _order = "asc", // chiều tăng dần
        } = req.query;

        const options = {
            page: _page,
            limit: _limit,
            [_sort]: _order === "desc" ? -1 : 1,
        };

        const idEvent = req.params.id;

        const data = await orderModel.paginate({ events: idEvent }, options).populate("customers");
        // console.log(data);
        if (!data.docs && data.docs.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy order!",
            });
        }
        return res.status(200).json({
            message: "Lấy danh sách order thành công",
            events: data,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const idOrder = req.params.id;

        const data = await orderModel.findByIdAndDelete(idOrder);
        if (!data) {
            return res.status(404).json({
                message: "Deleting Order is not successful",
            });
        }
        return res.status(200).json({
            message: "Deleting Order is successful",
            data,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const idOrder = req.params.id;

        const orderData = await orderModel.findById(idOrder).populate("customers").populate("seats");

        if (!orderData) {
            return res.status(404).json({
                message: "Getting Order is not successful!",
            });
        }

        return res.status(200).json({
            message: "Getting Order is successfull!",
            order: orderData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.massage,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const idOrder = req.params.id;
        const userLogin = req.user?._id;

        const { error } = orderModel.validate(orderData);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const order = await orderModel.findById(idOrder).populate("customers").populate("events").populate("seats");
        
        const isEqualCreatorEvent = order.events.creator._id.equals(userLogin);
        if (isEqualCreatorEvent) {
            // console.log('data:' + data);
            const editedData = await orderModel.findByIdAndUpdate(idOrder, orderData, { new: true })

            if (!editedData) {
                return res.status(404).json({
                    message: "Cập nhật Order không thành công!",
                });
            }

            return res.status(200).json({
                message: "Cập nhật Order thành công",
                data: editedData
            });
        }


        return res.status(400).json({
            message: "Bạn không có quyền chỉnh sửa Order này!"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


    module.exports = {
        createOrder,
        getAllOrders,
        deleteOrder,
        getOrderById,
        updateOrder
    }