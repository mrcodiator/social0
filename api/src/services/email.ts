import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";


configDotenv();

export const sendEmailService = async ({ email, otp }: { email: string, otp: string }) => {
    console.log(email, otp);

    console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER, process.env.BREVO_API);


    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.BREVO_API,
            },
        });

        let info = await transporter.sendMail({
            from: `"Brevo" ${process.env.SMTP_USER}`,
            to: email,
            subject: "Brevo OTP",
            text: `Your OTP is ${otp}.\n This OTP is valid for 10 minutes.`,
        });

        console.log(info);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


