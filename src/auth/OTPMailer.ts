import { createTransport } from "nodemailer";

const mailerConfiguration = {
  host: process.env.EMAIL_SERVER_HOST!,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER!,
    pass: process.env.EMAIL_SERVER_PASSWORD!,
  },
};

const OTPMailer = {
  async sendOTP(email: string, otp: string): Promise<void> {
    const mailer = createTransport(mailerConfiguration);
    await mailer.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Your verification OTP",
      text: `Your verification OTP is ${otp}.`,
      html: `<p>Your verification OTP is <strong>${otp}</strong>.</p>`
    });
  },
};

export default OTPMailer;
