// import nodemailer from "nodemailer";

// const {
//   SMTP_HOST,
//   SMTP_PORT,
//   SMTP_USER,
//   SMTP_PASS,
//   MAIL_FROM,
//   NEXTAUTH_URL,
// } = process.env;

// export const mailer = nodemailer.createTransport({
//   host: SMTP_HOST,
//   port: 587, 
//   // secure: false, 
//   auth: {
//     user: SMTP_USER,
//     pass: SMTP_PASS, 
//   },
// });



// type SendMailOptions = {
//   to: string;
//   subject: string;
//   html: string;
// };

// export async function sendMail({ to, subject, html }: SendMailOptions) {
//   await mailer.sendMail({
//     from: process.env.MAIL_FROM || process.env.SMTP_USER,
//     to,
//     subject,
//     html,
//   });
// }
// export async function sendPasswordResetEmail(to: string, url: string) {
//   const html = `
//   <div style="font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
//     <h2 style="margin:0 0 8px">Reset your password</h2>
//     <p style="margin:0 0 12px">We received a request to reset your password.</p>
//     <p style="margin:0 0 16px">
//       <a href="${url}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none">
//         Set a new password
//       </a>
//     </p>
//     <p style="font-size:13px;color:#475569;margin:0">If you didn’t request this, you can safely ignore this email.</p>
//     <p style="font-size:12px;color:#64748b;margin:16px 0 0">This link expires in 30 minutes.</p>
//   </div>`;
//   await mailer.sendMail({
//     to,
//     from: MAIL_FROM,
//     subject: "Reset your password",
//     html,
//   });
// }
// export async function verifyEmail(to: string, token: string) {
//   console.log("Sending verification email to:", to);
//   const html = `
//     <div style="font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; padding: 24px;">
//     <table style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
//       <tr>
//         <td style="padding: 32px 32px 16px; text-align: center;">
//           <h1 style="margin: 0; color: #0f172a; font-size: 22px;">Verify your email</h1>
//         </td>
//       </tr>
//       <tr>
//         <td style="padding: 0 32px 24px; text-align: center;">
//           <p style="color: #475569; margin: 8px 0 16px;">
//             Thanks for signing up! Please confirm your email address by clicking the button below.
//           </p>
//           <a href="${NEXTAUTH_URL}/verify-email/?token=${token}" 
//              style="display: inline-block; background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
//             Verify Email
//           </a>
//           <p style="font-size: 13px; color: #94a3b8; margin-top: 24px;">
//             This link will expire in 30 minutes for security reasons.
//           </p>
//           <p style="font-size: 12px; color: #94a3b8;">
//             If you didn’t request this, please ignore this email.
//           </p>
//         </td>
//       </tr>
//       <tr>
//         <td style="padding: 16px; text-align: center; background-color: #f1f5f9; font-size: 12px; color: #94a3b8;">
//           © ${new Date().getFullYear()} Sysartx. All rights reserved.
//         </td>
//       </tr>
//     </table>
//   </div>`;
//   await mailer.sendMail({
//     to,
//     from: MAIL_FROM,
//     subject: "Verify your email",
//     html,
//   });
// }
// console.log("Mailer configured with:", {"host": SMTP_HOST, "port": SMTP_PORT, "user": SMTP_USER, "from": MAIL_FROM, "pass":SMTP_PASS});