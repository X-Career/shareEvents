const Joi = require('joi').extend(require('@joi/date'));

const orderValidator = Joi.object({
    status: Joi.string(),
    amount: Joi.number(),
    paymentOfMethod: Joi.string(),
    events: Joi.string(),
    customers: Joi.string(),
    seats: Joi.array(),
});

module.exports = orderValidator;