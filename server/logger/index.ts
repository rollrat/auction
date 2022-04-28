import { Request } from "express";
import { string } from "joi";
import fileLogger from "./fileLogger";

interface LogInfoFactoryType {
  msg?: string,
  req?: Request,
  err?: any,
}

export class LogInfo {
  msg?: string;
  req?: Request;
  err?: any;

  constructor(msg?: string, req?: Request, err?: any) {
    this.msg = msg;
    this.req = req;
    this.err = err;
  }

  toString(): string {
    var result: { [key: string]: any } = {};

    if (this.msg !== undefined) {
      result['msg'] = JSON.stringify(this.msg, null, 2);
    }

    if (this.req !== undefined) {
      const reqIp =
        this.req.headers["x-forwarded-for"] || this.req.socket.remoteAddress;
      const route = this.req.originalUrl;
      
      result['req'] = `${reqIp}, ${route}`;

      if (this.req.params !== undefined) {
        result['params'] = JSON.stringify(this.req.params, null, 2);
      }

      if (this.req.body !== undefined) {
        result['body'] = JSON.stringify(this.req.body, null, 2);
      }
    }

    if (this.err !== undefined) {
      result['err'] = JSON.stringify(this.err, null, 2);
    }

    return JSON.stringify(result, null, 2) ;
  }

  static create(param: LogInfoFactoryType): LogInfo {
    return new LogInfo(param.msg, param.req, param.err);
  }
}

class LoggerWrapper {
  error(msg: any): void;
  error(msg: string, ...meta: any[]): void;
  error(req: LogInfo, ...meta: any[]): void;
  error(msg: any, ...meta: any[]): void {
    if (typeof msg === "string") fileLogger.error(msg, meta);
    else if (msg instanceof LogInfo)
      fileLogger.error(msg.toString(), meta);
    else fileLogger.error(msg);
  }

  info(msg: any): void;
  info(msg: string, ...meta: any[]): void;
  info(req: LogInfo, ...meta: any[]): void;
  info(msg: any, ...meta: any[]): void {
    if (typeof msg === "string") fileLogger.info(msg, meta);
    else if (msg instanceof LogInfo)
      fileLogger.info(msg.toString(), meta);
    else fileLogger.info(msg);
  }

  warn(msg: any): void;
  warn(msg: string, ...meta: any[]): void;
  warn(req: LogInfo, ...meta: any[]): void;
  warn(msg: any, ...meta: any[]): void {
    if (typeof msg === "string") fileLogger.warn(msg, meta);
    else if (msg instanceof LogInfo)
      fileLogger.warn(msg.toString(), meta);
    else fileLogger.warn(msg);
  }
}

const logger = new LoggerWrapper();

export default logger;
