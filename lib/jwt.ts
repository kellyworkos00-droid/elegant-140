import jwt, { SignOptions } from "jsonwebtoken";
import { JWTPayload } from "./auth-types";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key-change-me";
const JWT_EXPIRE = "7d";

export function generateToken(user: JWTPayload): string {
  const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRE,
  };
  return jwt.sign(user, JWT_SECRET, signOptions);
}

export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice(7);
}
