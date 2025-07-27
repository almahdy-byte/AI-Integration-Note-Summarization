import nodemailer from 'nodemailer';
import EventEmitter from 'events';
import { html } from './template.js';

const sendEmail = async ({ from, to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: 'Please view this email in HTML format.',
      html,
    });
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export const EmailEvents = new EventEmitter();

EmailEvents.on('ForgetPassword', async ({ email, code, userName }) => {
  await sendEmail({
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: 'Reset Password',
    html: html(code, userName),
  });
});
