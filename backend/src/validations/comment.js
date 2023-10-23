const Joi = require('joi');

const commentValidator = Joi.object({
    content: Joi.string().required().messages({
        "any.required": "Trường \"comment\" là bắt buộc!"
    }),
    status: Joi.string(),
    events: Joi.string(),
    customers: Joi.string(),
    
});

module.exports = commentValidator;

