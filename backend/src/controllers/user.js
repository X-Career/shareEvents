const userModel = require("../models/user.model.js");
const { loginValidator, registerValidator } = require("../validations/user.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
    const { 
        fullName,
        gender,
        dayOfBirth,
        email,
        phoneNumber,
        userName,
        password,
        role
    } = req.body;
    const fileImage = req.file;

    console.log(req.body);

    try {
        const { error } = registerValidator.validate(req.body, { abortEarly: false })

        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({
                message: errors
            })
        }

        const emailExists = await userModel.findOne({ email: email });
        const userNameExists = await userModel.findOne({ userName: userName });
        const phoneNumberExists = await userModel.findOne({ phoneNumber: phoneNumber });
        if (emailExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn vui lòng nhập email khác!"
            })
        }
        if (userNameExists) {
            return res.status(400).json({
                message: "Username này đã được đăng ký, bạn vui lòng nhập Username khác!"
            })
        }
        if (phoneNumberExists) {
            return res.status(400).json({
                message: "Số điện thoại này đã được đăng ký, bạn vui lòng nhập số điẹn thoại khác!"
            })
        }

        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(password, salt);

        const user = await userModel.create({
            fullName,
            gender,
            dayOfBirth,
            image: fileImage?.path,
            email,
            phoneNumber,
            userName,
            password: hash,
            role
        })

        user.password = undefined;
        return res.status(200).json({
            message: "Đăng ký tài khoản thành công!",
            user
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const { error } = loginValidator.validate(req.body, { abortEarly: false })

        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({
                message: errors
            })
        }

        const user = await userModel.findOne({ userName })
        if (!user) {
            return res.status(400).json({
                message: "Bạn chưa đăng ký Username này!"
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng!"
            })
        }

        const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        user.password = undefined
        return res.status(200).json({
            message: "Đăng nhập tài khoản thành công!",
            accessToken,
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    register,
    login
}