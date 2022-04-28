import express, { Request, Response, NextFunction } from "express";
import logger, { LogInfo } from "../logger";
import { QuerySchema, querySchema } from "../schema/query.schema";
import { queryHeader } from "../service/query.service";

const router = express.Router();

router.get(
  "/query",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await querySchema.validateAsync(req.query);
      const result = await queryHeader(value as QuerySchema);
      
      logger.info(LogInfo.create({req: req}));

      res.type("json").send(JSON.stringify(result));
    } catch (e) {
      logger.error(LogInfo.create({req: req, err: e }) );
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
