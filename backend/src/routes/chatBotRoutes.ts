import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const { message } = req.body;
  console.log(message);
  res.send("Hello from chatBotRoutes!");
});

export default router;
