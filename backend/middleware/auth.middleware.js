import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

const protect = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await userModel.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export {protect};
