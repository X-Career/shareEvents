const Joi = require('joi').extend(require('@joi/date'));

const seatValidator = Joi.object({
    nameOfSeat: Joi.string().required().messages({
        "string.empty": "Tên của ghế không được để trống!",
        "any.required": "Trường \"nameOfSeat\" là bắt buộc!"
    }),
    type: Joi.string().required().messages({
        "string.empty": "Loại ghế không được để trống!",
        "any.required": "Trường \"nameOfSeat\" là bắt buộc!"
    }),
    price: Joi.number().required().messages({
        "price.empty": "Giá của ghế không được để trống!",
        "any.required": "Trường \"Giá\" là bắt buộc!"
    }),
    status: Joi.boolean().required().messages({
        "any.required": "Trường \"Status\" là bắt buộc!"
    }),
    events: Joi.string().required().messages({
        "string.empty": "Events không được để trống!",
        "any.required": "Trường \"Events\" là bắt buộc!"
    }),
});

module.exports = seatValidator;