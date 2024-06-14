import express, { Request, Response } from "express";
import createPDF from "../utils/pdf/PdfDocument";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/generate-pdf", async (req: Request, res: Response) => {
  try {
    const filePath = `${__dirname}/ticket.pdf`;
    const { orderData, qrCodeBase64 } = req.body;
    console.log("Order data:", orderData);
    console.log("QR Code Base64:", qrCodeBase64);
    const result = await createPDF({ orderData, qrCodeBase64 }, filePath);

    const transporter = nodemailer.createTransport({
      host: "smtp.zohocloud.ca",
      port: 587,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: "kak4sh16@gmail.com",
      subject: "Your Ticket",
      html: `<p>Dear Thang Nguyen,</p>
             <p>Thank you for your order. Here is your ticket:</p>
             <p>Order ID: 8588912958</p>
             <p> Below is the QR Code. You can scan it now!!! </p>`,
      attachments: [
        {
          filename: "ticket.pdf",
          path: filePath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(201).json({ message: "PDF generated and sent successfully" });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
});

export default router;
