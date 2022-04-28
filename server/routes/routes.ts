import express, { Request, Response, NextFunction } from "express";
import * as query from './query';

const router = express.Router();

router.use(query.routes);

router.get("/hello", (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress;
  res.send(ip);
});

export const routes = router;