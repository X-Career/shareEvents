const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const authentication = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.status(401).json({message: "Ban chua dang nhap"})
    }
    const token = bearerToken.split(" ")[1]
    try {
        const verify_token = jwt.verify(token,process.env?.SECRET_KEY)

        if(!verify_token){
            return res.status(401).json({message: "Bạn chưa đăng nhập!"})
        }

        const userId = verify_token?.userId

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
}

module.exports = authentication;