const Joi = require('joi').extend(require('@joi/date'));

const eventValidator = Joi.object({
    nameE: Joi.string().required().messages({
        "string.empty": "Tên của sự kiện không được để trống!",
        "any.required": "Trường \"tên\" của sự kiện là bắt buộc!"
    }),
    time: Joi.string().required().messages({
        "date.empty": "Ngày không được để trống"
    }),
    startingTime: Joi.string().required().messages({
        "date.empty": "Ngày không được để trống"
    }),
    endingTime: Joi.string().required().messages({
        "date.empty": "Ngày không được để trống"
    }),
    seats: Joi.array(),
    image: Joi.array(),
    location: Joi.string().required().messages({
        "string.empty": "Location không được để trống!",
        "any.required": "Trường \"location\" là bắt buộc!"
    }),
    status: Joi.string().required().messages({
        "string.empty": "Status không được để trống!",
        "any.required": "Trường \"status\" là bắt buộc!"
    }),
    information: Joi.string(),
    orders: Joi.array(),
    paymentOfMethod: Joi.string(),
    price: Joi.array().required().messages({
        "any.required": "Trường \"price\" là bắt buộc!"
    }),
    categories: Joi.string(),
    creator: Joi.string(),
    comments: Joi.array(), 
});

module.exports = {
    eventValidator
}