const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                msg: "token not found"
            })
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                msg: "Server configuration error: JWT_SECRET is not defined"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            return res.status(401).json({
                msg: "token is not verified"
            })
        }
        const user = await User.findById(decodedToken.token)
            .populate('followers')
            .populate('reposts')

        if (!user) {
            return res.status(401).json({
                msg: "user not found with the token received"
            })
        }
        req.user = user
        next();
    } catch (err) {
        return res.status(401).json({
            msg: "Error in authorization", err: err.message
        })
    }
}
module.exports = auth
