import express, { Request, Response } from "express";
import User, { UserType } from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/email/sendEmail";
import {
  forgetPassword,
  resetPassword,
} from "../controllers/forget_reset_Password";

const router = express.Router();

// Handle register
router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check("username", "Username with 6 or more characters required ").isLength({
      min: 4,
    }),
    check("password", "Password with 6 or more characters required ").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      console.log(req.body);
      let user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "User registration OK" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

// Handle login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user: UserType | null = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token: string = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("username email");
    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
});

router.get("/u/:username", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("username email stream imageUrl blockByIds bio")
      .populate("stream");
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
});

router.put("/u/update", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const { firstName, lastName, bio, imageUrl } = req.body;
    if (firstName !== undefined) {
      user.firstName = firstName;
    }
    if (lastName !== undefined) {
      user.lastName = lastName;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }
    if (imageUrl !== undefined) {
      user.imageUrl = imageUrl;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
});

router.post("/help/contact-us", async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, subject, description, attachments } =
      req.body;
    if (!email || !firstName || !lastName || !subject || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendEmail(
      undefined,
      undefined,
      `Request Support From ${email}`,
      { email, firstName, lastName, subject, description, attachments },
      "./template/contactUsSupport.handlebars"
    );
    return res.json({ message: "Message been sent sucessfully!" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  if (req.userId) {
    res.status(200).send({ userId: req.userId });
  } else {
    res.status(401).send({ message: "Invalid or expired token." });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
});

router.patch("/update", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true }); //When { new: true } is set, The method returns the document AFTER the update is applied
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({message: 'User information updated successfully'});
  } catch (error) {
    console.error("Failed to change user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
