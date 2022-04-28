import cookieParser from "cookie-parser";
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes/routes";

const PORT: number = parseInt(process.env.PORT as string) || 8864;
const HOST: string = process.env.HOST || "localhost";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, HOST, () => {
    console.log(`server start ${HOST}:${PORT}`);
  });
}

export default app;
