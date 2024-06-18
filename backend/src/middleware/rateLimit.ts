import { NextFunction, Request, Response } from "express";
import { rateLimiter } from "../utils/rate-limiter";

const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip ?? "127.0.0.1";
  try {
    const { success } = await rateLimiter.limit(ip);
    if (!success) {
      return res
        .status(429)
        .json({ error: "You are writing messages too fast." });
    }
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Sorry, something went wrong porocessing your message. Please try again later",
    });
  }
};

export default rateLimitMiddleware;
