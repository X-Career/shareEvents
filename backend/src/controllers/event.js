const eventModel = require("../models/event.model");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");
const commentModel = require("../models/comment.model");
const seatModel = require("../models/seat.model");
const { eventValidator } = require("../validations/event.js");
const dotenv = require("dotenv");
const { query } = require("express");

dotenv.config();

const getList = async (req, res) => {
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

        const data = await eventModel.paginate({ status: "public" }, options);
        console.log(data);
        if (!data.docs && data.docs.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sự kiện!",
            });
        }
        return res.status(200).json({
            message: "Lấy danh sách sự kiện thành công",
            events: data,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getDetailEvent = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user?._id;
        const fileImages = req.files;

        // console.log("event:", data)

        const { error } = eventValidator.validate(data);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Bạn vui lòng kiểm tra lại dữ liệu!",
            });
        }

        const event = await eventModel.create({
            ...data,
            creator: user,
            image: fileImages?.path
        });

        console.log(event)

        if (!event) {
            return res.status(404).json({
                message: "Bạn tạo sự kiện không thành công!",
            });
        }

        const updateCategories = await categoryModel.findByIdAndUpdate(event.categories, {
            $addToSet: {
                events: event._id,
            },
        });

        if (!updateCategories) {
            return res.status(404).json({
                message: "Thêm category cho sự kiện không thành công!",
            });
        }
        return res.status(200).json({
            message: "Bạn đã tạo sự kiện thành công!",
            events: data,
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {

};

const deleteEvent = async (req, res) => {
    try {
        const idEvent = req.params.id;
        
            const data = await eventModel.findByIdAndDelete(idEvent);

            if (!data) {
                return res.status(404).json({
                    message: "Deleting event is not successful",
                });
            }
            return res.status(200).json({
                message: "Deleting event is successful",
                data,
            });
        

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getList,
    getDetailEvent,
    createEvent,
    updateEvent,
    deleteEvent
}
