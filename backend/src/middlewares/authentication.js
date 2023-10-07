const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");


const authentication = async (req, res, next) => {    
    const bearerToken = req.headers.authorization;

    if(!bearerToken){
        return res.status(401).json({message: "Bạn chưa đăng nhập"})
    }
    const token = bearerToken.split(" ")[1]
    try {
        const verify_token = jwt.verify(token,process.env?.JWT_SECRET)

        if(!verify_token){
            return res.status(401).json({message: "Bạn chưa đăng nhập!"})
        }

        const userId = verify_token?._id

        const checkUser = await userModel.findById(userId)


        if(!checkUser){
            return res.status(404).json({message: "Người dùng không tồn tại!"})
        }

        req.user = checkUser

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "Bạn chưa đăng nhập!"})
    }
};

const checkPermissionAdmin = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if(!bearerToken){
            return res.status(401).json({message: "Bạn chưa đăng nhập"})
        }

        const token = bearerToken.split(" ")[1]

        if(!token) {
            return res.status(400).json({message: "Token rỗng!"})
        }

        const verify_token = jwt.verify(token,process.env?.JWT_SECRET)

        // console.log(verify_token);

        if(!verify_token){
            return res.status(401).json({message: "Bạn chưa đăng nhập!"})
        }

        const userId = verify_token?._id

        // console.log(verify_token?._id);

        const checkUser = await userModel.findById(userId)

        console.log(checkUser);

        if(!checkUser || checkUser.role !== "admin"){
            return res.status(404).json({message: "Bạn không có quyền làm việc này!"})
        }

        req.user = checkUser;

        next();


    } catch (error) {
        return res.status(401).json({
            message: error.message || "Bạn không có quyền!"
        })
    }
};

const checkPermissionCreator = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if(!bearerToken){
            return res.status(401).json({message: "Bạn chưa đăng nhập"})
        }
        const token = bearerToken.split(" ")[1]
        if(!token) {
            return res.status(400).json({message: "Token rỗng!"})
        }

        const verify_token = jwt.verify(token,process.env?.JWT_SECRET)

        if(!verify_token){
            return res.status(401).json({message: "Bạn chưa đăng nhập!"})
        }

        const userId = verify_token?._id

        const checkUser = await userModel.findById(userId)

        if(!checkUser || checkUser.role !== "creator"){
            return res.status(404).json({message: "Bạn không có quyền làm việc này!"})
        }

        req.user = checkUser;

        next();


    } catch (error) {
        return res.status(401).json({
            message: error.message || "Bạn không có quyền!"
        })
    }
};

module.exports = {
    authentication,
    checkPermissionAdmin,
    checkPermissionCreator
};