import mongoose from "mongoose";
import logger, { LogInfo } from "../logger";

const url = "mongodb://localhost:27017/ca";

export default function () {
  mongoose
    .connect(url, {})
    .then(() => logger.info(LogInfo.create({ msg: "mongodb connected!" })))
    .catch((e) => logger.error(LogInfo.create({ err: e })));
}

