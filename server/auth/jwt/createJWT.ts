import * as jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { privateKey } from "../../config/jwtKey";

export function createAccessToken(id: number, user_id: string): string {
  const accessPayload = {
    id: id,
    user_id: user_id,
    type: "access",
  };

  const accessTokenOptions: jwt.SignOptions = {
    algorithm: "RS256",
    expiresIn: "2h",
    issuer: config.issuer,
  };

  const accessToken = jwt.sign(accessPayload, privateKey, accessTokenOptions);

  return accessToken;
}

export function createJWT(id: number, user_id: string): string {
  const accessPayload = {
    id: id,
    user_id: user_id,
    type: "access",
  };

  const refreshPayload = {
    accessPayload: accessPayload,
    type: "refresh",
  };

  const refreshTokenOptions: jwt.SignOptions = {
    algorithm: "RS256",
    expiresIn: "14d",
    issuer: config.issuer,
  };

  const accessTokenOptions: jwt.SignOptions = {
    algorithm: "RS256",
    expiresIn: "2h",
    issuer: config.issuer,
  };

  const refreshToken = jwt.sign(
    refreshPayload,
    privateKey,
    refreshTokenOptions
  );
  const accessToken = jwt.sign(accessPayload, privateKey, accessTokenOptions);

  return JSON.stringify({
    refreshToken: refreshToken,
    accessToken: accessToken,
  });
}
