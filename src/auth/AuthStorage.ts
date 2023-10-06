import { Redis } from "ioredis"
import { randomBytes } from "crypto";
import { OTP_EXPIRATION_SECONDS, SESSIONID_EXPIRATION_SECONDS } from "./constants";

const redis = new Redis();

const AuthStorage = {
  async generateAndSetOTPForEmail(email: string): Promise<string> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await redis.set(`otp-${email}`, otp, "EX", OTP_EXPIRATION_SECONDS);
    return otp;
  },
  async isValidOTP(email: string, otp: string): Promise<boolean> {
    const storedValue = await redis.get(`otp-${email}`);
    return !!storedValue && storedValue === otp;
  },
  async removeOTP(email: string): Promise<void> {
    await redis.del(`otp-${email}`);
  },
  async createSessionID(email: string): Promise<string> {
    const sessionId = randomBytes(16).toString("hex");
    await redis.set(sessionId, email, "EX", SESSIONID_EXPIRATION_SECONDS);
    return sessionId;
  },
  async isValidSessionId(sessionId: string): Promise<boolean> {
    return (await redis.exists(sessionId)) === 1;
  },
  async checkUserSession(email: string, sessionId: string): Promise<boolean> {
    const storedUserEmail = await redis.get(sessionId);
    return !storedUserEmail || storedUserEmail !== email;
  },
  async handleClearSession(sessionId: string): Promise<void> {
    await redis.del(sessionId);
  },
};

export default AuthStorage;
