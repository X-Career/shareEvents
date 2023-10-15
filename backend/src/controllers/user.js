const userModel = require("../models/user.model.js");
const { loginValidator, registerValidator, updateValidator } = require("../validations/user.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { fields } = require("../cloudinary/index.js");

dotenv.config();

const register = async (req, res) => {
    const fullName = req.body.fullName;
    const gender = req.body.gender;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const userName = req.body.userName;
    const password = req.body.password;
    const role = req.body.role;
    const fileImage = req.file;

    try {
        const { error } = registerValidator.validate(req.body, { abortEarly: false })

        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({
                message: errors
            })
        }

        const emailExists = await userModel.findOne({ email: email });
        if (emailExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn vui lòng nhập email khác!"

            })
        }

        const userNameExists = await userModel.findOne({ userName: userName });
        if (userNameExists) {
            return res.status(400).json({
                message: "Username này đã được đăng ký, bạn vui lòng nhập Username khác!"
            })
        }

        const phoneNumberExists = await userModel.findOne({ phoneNumber: phoneNumber });
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
            dateOfBirth,
            image: fileImage?.path,
            email,
            phoneNumber,
            userName,
            password: hash,
            role
        })

        // console.log("user:" + fileImage);

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

const loadUser = async (req, res) => {
    try {
        const idUser = req.params.id;
        const userData = await userModel.findById(idUser);
        if (!userData) {
            return res.status(404).json({ message: "User is not found" });
        }
        return res.status(200).json({
            message: "User is successfully",
            user: userData,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const fullName = req.body.fullName;
        const gender = req.body.gender;
        const dateOfBirth = req.body.dateOfBirth;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const userName = req.body.userName;
        const password = req.body.password;
        const role = req.body.role;
        const fileImage = req.file;

        let data = {};
        if(req.body.fullName){
            data.fullName = req.body.fullName
        }
        if(req.body.gender){
            data.gender = req.body.gender
        }
        if(req.body.dateOfBirth){
            data.dateOfBirth = req.body.dateOfBirth
        }
        if(req.body.email){
            data.email = req.body.email
        }
        if(req.body.phoneNumber){
            data.phoneNumber = req.body.phoneNumber
        }
        if(req.body.userName){
            data.userName = req.body.userName
        }
        if(req.body.password){
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(password, salt);
            data.password = hash
        }
        if(req.body.role){
            data.role = req.body.role
        }
        if(req.file){
            data.image = fileImage?.path
        }


        const { error } = updateValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const emailExists = await userModel.findOne({ email: email });
        if (emailExists) {
            return res.status(400).json({
                message: "Email này đã được đăng ký, bạn vui lòng nhập email khác!"

            })
        }

        const userNameExists = await userModel.findOne({ userName: userName });
        if (userNameExists) {
            return res.status(400).json({
                message: "Username này đã được đăng ký, bạn vui lòng nhập Username khác!"
            })
        }

        const phoneNumberExists = await userModel.findOne({ phoneNumber: phoneNumber });
        if (phoneNumberExists) {
            return res.status(400).json({
                message: "Số điện thoại này đã được đăng ký, bạn vui lòng nhập số điẹn thoại khác!"
            })
        }

        // console.log(data);

        const idUser = req.params.id;

        console.log('data:' + data);
        const editedData = await userModel.findByIdAndUpdate(idUser, data, { new: true })

        
        if (!editedData) {
            return res.status(404).json({
                message: "Cập nhật thông tin User không thành công!",
            });
        }

        editedData.password = undefined;

        return res.status(200).json({
            message: "Cập nhật User thành công",
            data: editedData
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const idUser = req.params.id;

        const data = await userModel.findByIdAndDelete(idUser);

        if (!data) {
            return res.status(404).json({
              message: "Deleting user is not successful",
            });
          }
          return res.status(200).json({
            message: "Deleting user is successful",
            data,
          });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });    
    }
};

module.exports = {
    register,
    login,
    updateUser,
    loadUser,
    deleteUser,
}