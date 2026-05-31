import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Urban bites by Satish Yadav" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html
        });

        console.log("Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default sendEmail;