import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/hello", (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress;
  res.send(ip);
});

export const routes = router;