import express, { Request, Response, Router} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/login", [
    check("email","Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6,
    })
], async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const user  = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        // Hashing the password that user type in and the password used for registration
        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, 
            {
                expiresIn: "1d",
            }
            );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({userId: user._id})

    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
})

// Make a request to validate-token endpoint => run middleware ==> 
// check the HTTP cookie => if it passes, forward the request to below
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({userId: req.userId})

})

export default router