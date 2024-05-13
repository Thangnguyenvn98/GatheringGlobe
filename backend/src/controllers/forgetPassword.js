"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const forgetPassword = async (req, res) => {
    // Logic for forget password
    try {
        // FInd the user by email
        const user = await user_1.default.findOne({ mail: req.body.mail });
        // If not user --> error
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "20m", });
        // Send the token to the user's email
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_APP_EMAIL,
            },
        });
        // Email configuration
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Reset Password",
            html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
        };
        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.status(200).send({ message: "Email sent" });
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};
exports.forgetPassword = forgetPassword;
const resetPassword = async (req, res) => {
    try {
        // Verify the token sent by the user 
        const decodedToken = jsonwebtoken_1.default.verify(req.params.token, process.env.JWT_SECRET_KEY);
        // If the token is invalid, return an error
        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }
        // find the user with the id from the token
        const user = await user_1.default.findOne({ _id: decodedToken.userId });
        if (!user) {
            return res.status(401).send({ message: "no user found" });
        }
        // Hash the new password
        const salt = await bcryptjs_1.default.genSalt(10);
        req.body.newPassword = await bcryptjs_1.default.hash(req.body.newPassword, salt);
        // Update user's password, clear reset token and expiration time
        user.password = req.body.newPassword;
        await user.save();
        // Send success response
        res.status(200).send({ message: "Password updated" });
    }
    catch (err) {
        // Send error response if any error occurs
        res.status(500).send({ message: err.message });
    }
};
exports.resetPassword = resetPassword;
