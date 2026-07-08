import jwt from 'jsonwebtoken';

const isloggedin = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
            });
        }

        // Store user id in request
        req.id = decode._id;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Authentication Failed",
            success: false,
        });
    }
};

export default isloggedin;