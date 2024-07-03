// sendEmail.ts

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

/**
 * Sends an email using specified template.
 *
 * @param {string} fromEmail - The email address from which the email is sent.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {object} payload - The data to be used in the template.
 * @param {string} template - The path to the Handlebars template file.
 */

const sendEmail = async (
  fromEmail: string = process.env.USER_EMAIL as string,
  toEmail: string = process.env.PERSONAL_EMAIL as string,
  subject: string,
  payload: any,
  template: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    html: compiledTemplate(payload),
  };

  const info = await transporter.sendMail(mailOptions);
};

export default sendEmail;
