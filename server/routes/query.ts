import express, { Request, Response, NextFunction } from "express";
import logger, { LogInfo } from "../logger";

const router = express.Router();

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const value = await readSchema.validateAsync(req.params);
      // const article = await readArticle(value as ArticleReadInterface);

      logger.info(LogInfo.create({req: req}));

      res.type("json").send(JSON.stringify(req.params.id));
    } catch (e) {
      logger.error(LogInfo.create({req: req, err: e }) );
      res.status(400).type("json").send();
    }
  }
);

export const routes = router;
