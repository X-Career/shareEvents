const Joi = require('joi');

const commentValidator = Joi.object({
    content: Joi.string().required().messages({
        "any.required": "Trường \"comment\" là bắt buộc!"
    }),
    events: Joi.string().required().messages({
        "string.empty": "events không được để trống!",
        "any.required": "Trường \"events\" là bắt buộc!"
    }),
    users: Joi.string().required().messages({
        "string.empty": "users không được để trống!",
        "any.required": "Trường \"users\" là bắt buộc!"
    }),
});

module.exports = commentValidator

