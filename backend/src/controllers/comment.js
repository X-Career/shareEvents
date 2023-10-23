const commentModel = require("../models/comment.model");
const userModel = require("../models/user.model");
const eventModel = require("../models/event.model");
const commentValidator = require("../validations/comment");

const createComment = async (req, res) => {
    try {
        const idEvent = req.params.id;
        const dataComment = req.body;
        const user = req.user?._id;

        // console.log(idEvent, user, dataComment);

        const { error } = commentValidator.validate(dataComment);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Bạn vui lòng kiểm tra lại dữ liệu!",
            });
        }

        const dataEvent = await eventModel.findById(idEvent);
        const dateEvent = new Date(dataEvent.time).getTime();
        const today = new Date().getTime();

        if (today <= dateEvent) {
            return res.status(400).json({
                message: "Bạn chỉ có thế đánh giá sau khi sự kiện diễn ra!"
            })
        }
        const comment = await commentModel.create({
            ...dataComment,
            customers: user,
            events: idEvent
        });

        if (!comment) {
            return res.status(404).json({
                message: "Bạn tạo comment không thành công!",
            });
        }

        const updateEvent = await eventModel.findByIdAndUpdate(comment.events, {
            $addToSet: {
                comments: comment._id
            },
        });

        if (!updateEvent) {
            return res.status(404).json({
                message: "Thêm comment cho sự kiện không thành công!",
            });
        }
        return res.status(200).json({
            message: "Bạn đã tạo comment thành công!",
            comment: comment,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const commentData = req.body;
        const idComment = req.params.id;
        const userLogin = req.user?._id;

        const { error } = commentModel.validate(commentData);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const comment = await commentModel.findById(idComment).populate("customers").populate("events");

        console.log("comment: " + comment + "idLogin: " + userLogin + " idCreator: " + comment.events.creator._id)
        if (userLogin !== comment.customers._id ?? comment.events.creator._id) {
            return res.status(400).json({ message: "Bạn không có quyền chỉnh sửa Comment này!" });
        }

        // console.log('data:' + data);
        const editedData = await commentModel.findByIdAndUpdate(idComment, commentData, { new: true })

        if (!editedData) {
            return res.status(404).json({
                message: "Cập nhật Comment không thành công!",
            });
        }

        return res.status(200).json({
            message: "Cập nhật Comment thành công",
            data: editedData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createComment,
    updateComment
}