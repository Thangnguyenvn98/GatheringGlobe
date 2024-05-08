import express, {Request, Response} from "express";
import User, {UserType} from "../models/user";
import jwt from "jsonwebtoken"
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import { compare } from "bcryptjs";

const router = express.Router();

// Handle register
router.post("/register", [
    check("email", "Email is required").isEmail(),
    check("username", "Username with 6 or more characters required ").isLength({min: 4}),
    check("password", "Password with 6 or more characters required ").isLength({min: 6})
], async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    try {
        console.log(req.body)
        let user = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }]
        });

        if(user) {
            return res.status(400).json({message: "User already exists"});

        }

        user = new User(req.body)
        await user.save();

        const token = jwt.sign({userId: user.id},
             process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d",
             }
              )




     res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
     })
     return res.status(200).send({message: "User registration OK"});
    }catch(error){
        console.log(error)
        res.status(500).send({message: "Something went wrong"});

    }

});

// Handle login
router.post("/login", [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").exists()
], async(req: Request, res: Response) => {
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

      const isMatch: boolean = await compare(password, user.password);

      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token: string = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, {
          expiresIn: "1d",
      });

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
});



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

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
  });

router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("auth_token");
    res.status(200).send({ message: "Logged out successfully" });
});

export default router