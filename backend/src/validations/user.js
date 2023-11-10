const Joi = require('joi').extend(require('@joi/date'));

const updateValidator = Joi.object({
    fullName: Joi.string().messages({
    }),
    dateOfBirth: Joi.string().messages({        
    }),
    userName: Joi.string().messages({
    }),
    phoneNumber: Joi.string().length(10).messages({
        "string.pattern.base": `Số điện thoại phải có 10 chữ số!`
    }),
    email: Joi.string().email().messages({
        "string.email": "Email không đúng định dạng!"
    }),
    password: Joi.string().min(6).messages({
        "string.min": "Password phải có ít nhất {#limit} ký tự!"
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "string.min": "confirmPassword phải có ít nhất {#limit} ký tự!",
        "any.only": "Mật khẩu nhập lại không khớp!"
    }),
    role: Joi.string().messages({
    }),
    events: Joi.array(),
    orders: Joi.array()
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

const registerValidator = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "Họ và tên không được để trống!",
        "any.required": "Trường \"fullName\" là bắt buộc!"
    }),
    dateOfBirth: Joi.string().messages({

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
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "string.empty": "confirmPassword không được để trống!",
        "any.required": "Trường \"confirmPassword\" là bắt buộc!",
        "string.min": "confirmPassword phải có ít nhất {#limit} ký tự!",
        "any.only": "Mật khẩu nhập lại không khớp!"
    }),
    role: Joi.string().messages({
    }),
    events: Joi.array(),
    orders: Joi.array(),
    status: Joi.string(),
});

module.exports = {
    registerValidator,
    loginValidator,
    updateValidator
}
