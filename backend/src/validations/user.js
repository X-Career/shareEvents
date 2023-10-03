// const Joi = require('joi');

const Joi = require('joi')
    .extend(require('@joi/date'));

const registerValidator = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "Họ và tên không được để trống!",
        "any.required": "Trường \"fullName\" là bắt buộc!"
    }),
    dateOfBirth: Joi.date().format("YYYY-MM-DD").utc({
        "date.pattern.base": "Ngày sinh không đúng định dạng!"
    }),
    userName: Joi.string().required().messages({
        "string.empty": "userName không được để trống!",
        "any.required": "Trường \"userName\" là bắt buộc!" 
    }),
    phoneNumber: Joi.string().length(10).required().messages({
        "string.pattern.base": `Số điện thoại phải có 10 chữ số!`
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email không được để trống!",
        "any.required": "Trường \"email\" là bắt buộc!",
        "string.email": "Email không đúng định dạng!"
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Password không được để trống!",
        "any.required": "Trường \"password\" là bắt buộc!",
        "string.min": "Password phải có ít nhất {#limit} ký tự!"
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "string.empty": "confirmPassword không được để trống!",
        "any.required": "Trường \"confirmPassword\" là bắt buộc!",
        "string.min": "confirmPassword phải có ít nhất {#limit} ký tự!",
        "any.only": "Mật khẩu nhập lại không khớp!"
    }),
    role: Joi.string().required()
});

const loginValidator = Joi.object({
    userName: Joi.string().required().messages({
        "string.empty": "userName không được để trống!",
        "any.required": "Trường \"userName\" là bắt buộc!" 
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Password không được để trống!",
        "any.required": "Trường \"password\" là bắt buộc!",
        "string.min": "Password phải có ít nhất {#limit} ký tự!"
    })
});

module.exports = {
    registerValidator,
    loginValidator
}
