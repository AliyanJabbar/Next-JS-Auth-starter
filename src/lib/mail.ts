import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"AJ Auth Starter" <noreply@example.com>',
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Reset Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};
