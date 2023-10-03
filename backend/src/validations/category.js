const Joi = require("joi");

const categoryValidator = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Tên của sự kiện không được để trống!",
    "any.required": "Trường \"Name\" là bắt buộc!",
    "string.min": "Tên của sự kiện phải có ít nhất {#limit} ký tự!"    
  }),
  slug: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Slug không được để trống!",
    "any.required": "Trường \"Slug\" là bắt buộc!",
    "string.min": "Slug phải có ít nhất {#limit} ký tự!",
    "string.max": "Slug không được nhiều hơn {#limit} ký tự"    
  }),
});

export default categoryValidator;
