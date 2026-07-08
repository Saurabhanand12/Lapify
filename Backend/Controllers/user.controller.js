import bcrypt from 'bcrypt';
import crypto from 'crypto';
import usermodel from '../Models/user.model.js';
import jwt from 'jsonwebtoken';
import getdatauri from '../Utils/datauri.js';
import cloudinary from '../Utils/cloudinary.js'

//// Create User Account
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: " Something is Missing , Please Check again ",
                success: false,
            });
        }

        const user1 = await usermodel.findOne({
            $or: [{ username }, { email }],
        });

        if (user1) {
            return res.status(400).json({
                message: " User is Already Exists ",
                success: false,
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await usermodel.create({
            username,
            email,
            password: hash,
        });

        return res.status(201).json({
            message: "Account Created Succesfully ",
            success: true,
        });;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

///// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email or Password is Missing ",
                success: false,
            });
        }

        const userdata = await usermodel.findOne({ email });

        if (!userdata) {
            return res.status(400).json({
                message: "Incorrect Email or password",
                success: false,
            });
        }

        const matchpassword = await bcrypt.compare(password, userdata.password);

        if (!matchpassword) {
            return res.status(400).json({
                message: "Incorrect Email or password",
                success: false,
            })
        }

        const token = jwt.sign(
            {
                _id: userdata._id,
                email: userdata.email
            },
            process.env.SECRET_KEY,
            { expiresIn: "7d" },
        );

        const user = {
            _id: userdata._id,
            username: userdata.username,
            email: userdata.email,
            profilepic: userdata.profilepic,
            role: userdata.role,
        }

        return res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        }).status(200).json({
            message: `Welcome Back ${user.username}`,
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error ", success: false });
    }
}

//// Forget password 
export const forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not found",
                success: false,
            });
        }

        // generate token
        const token = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = token;

        await user.save();

        res.status(200).json({
            message: "Reset link generated",
            success: true,
            resetLink: `http://localhost:5173/reset-password/${token}`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

//// Reset password 
export const resetpassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        const user = await usermodel.findOne({ resetPasswordToken: token });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Token",
                success: false,
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        user.password = hashpassword;
        user.resetPasswordToken = undefined;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

////// Change Password 
export const changepassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        const user = await usermodel.findById(req.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

//// Logout User 
export const logout = async (req, res) => {
    try {
        return res.cookie("token", " ", { maxAge: 0 }).json({
            message: "User Logout Successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error ", success: false });
    }
}

//// update Profile and Username 
export const edit = async (req, res) => {
    try {
        const { username } = req.body;
        const profilepic = req.file;

        const user = await usermodel.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }


        let cloudresponse;

        if (profilepic) {
            const fileuri = getdatauri(profilepic);


            if (fileuri?.content) {
                const fileuri = getdatauri(profilepic);

                cloudresponse = await cloudinary.uploader.upload(
                    fileuri.content
                );
            }
        }

        if (username) {
            user.username = username;
        }

        if (cloudresponse) {
            user.profilepic = cloudresponse.secure_url;
        }
        await user.save();

        return res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

//// Get profile 
export const getprofile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await usermodel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    }
}
