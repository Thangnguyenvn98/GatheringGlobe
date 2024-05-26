import express from "express";
import { forgetPassword, resetPassword } from '../controllers/forget_reset_Password';
const router = express.Router();

router.post("/forgetPassword", forgetPassword);
router.post("/reset-password",resetPassword)
export default router;