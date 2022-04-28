import * as fs from 'fs';

export const privateKey = fs.readFileSync('config/testPrivate.pem').toString();
export const publicKey = fs.readFileSync('config/testPublic.pem').toString();