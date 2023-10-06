const Joi = require('joi').extend(require('@joi/date'));

const eventValidator = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Tên của sự kiện không được để trống!",
        "any.required": "Trường \"name\" là bắt buộc!"
    }),
    startingTime: Joi.date().format("YYYY-MM-DD").utc({
        "date.pattern.base": "Ngày không đúng định dạng!",
        "date.empty": "Ngày không được để trống"
    }),
    endingTime: Joi.date().format("YYYY-MM-DD").utc({
        "date.pattern.base": "Ngày không đúng định dạng!",
        "date.empty": "Ngày không được để trống"
    }),
    image: Joi.array().required().messages({
        "any.required": "Trường hình ảnh là bắt buộc!"
    }),
    location: Joi.string().email().required().messages({
        "string.empty": "Location không được để trống!",
        "any.required": "Trường \"location\" là bắt buộc!"
    }),
    status: Joi.string().required().messages({
        "string.empty": "Status không được để trống!",
        "any.required": "Trường \"status\" là bắt buộc!"
    }),
    paymentOfMethod: Joi.string().required().messages({
        "string.empty": "paymentOfMethod không được để trống!",
        "any.required": "Trường \"paymentOfMethod\" là bắt buộc!"
    }),
    quantityOfSeat: Joi.number().required().messages({
        "string.empty": "quantityOfSeat không được để trống!",
        "any.required": "Trường \"quantityOfSeat\" là bắt buộc!"
    }),
    categories: Joi.array().required().messages({
        "any.required": "Trường \"category\" là bắt buộc!",
    }),
    users: Joi.string().required().messages({
        "string.empty": "Users không được để trống!",
        "any.required": "Trường \"users\" là bắt buộc!"
    }),
    comments: Joi.array().required().messages({
        "any.required": "Trường \"comments\" là bắt buộc!",
    }), 
});

module.exports = {
    eventValidator
}
