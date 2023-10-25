const Joi = require('joi').extend(require('@joi/date'));

const seatValidator = Joi.object({
    nameOfSeat: Joi.string().required().messages({
        "string.empty": "Tên của ghế không được để trống!",
        "any.required": "Trường \"nameOfSeat\" là bắt buộc!"
    }),
    type: Joi.string(),
    events: Joi.array(),
});

module.exports = seatValidator;