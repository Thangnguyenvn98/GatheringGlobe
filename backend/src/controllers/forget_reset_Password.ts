import User from "../models/user";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const forgetPassword = async (req: Request, res: Response) => {
  // Logic for forget password
  try {
    // FInd the user by email
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);

    // If not user --> error
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "20m" }
    );

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      // service: "outlook",
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "gatheringglobe@outlook.com",
        pass: "123456789ok",
      },
      tls: {
        ciphers: "SSLv3", // Use a secure cipher
        rejectUnauthorized: false,
      },
    });

    // Email configuration
    const mailOptions = {
      from: "gatheringglobe@outlook.com",
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password?token=${token}&id=${user._id}">http://localhost:5173/reset-password?token=${token}&id=${user._id}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err: Error | null) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).send({ message: (err as Error).message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body); // Log the incoming request body

    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.body.token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    console.log("Decoded token:", decodedToken); // Log the decoded token

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    console.log("User found:", user); // Log the user found

    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    // Hash the new password
    const hash = await bcrypt.hash(req.body.newPassword, 8);
    console.log("Hashed password:", hash); // Log the hashed password
    console.log(user.password);
    // Update user's password
    await User.updateOne(
      { _id: decodedToken.userId },
      { $set: { password: hash } }
    );
    console.log("Password updated for user ID:", decodedToken.userId); // Log the update status

    // Find the user again to check the updated password
    const updatedUser = await User.findOne({ _id: decodedToken.userId });
    console.log("Updated user:", updatedUser); // Log the updated user

    // Optionally send an email to notify the user of the password reset
    // sendEmail(user.email, "Password Reset Successfully", { name: user.username }, "./template/resetPassword.handlebars");

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    console.error("Error in resetPassword:", err); // Log the error
    res.status(500).send({ message: (err as Error).message });
  }
};
