require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const renderTemplate = (templatePath: string, data: Record<string, string> = {}) => {
    let html = fs.readFileSync(templatePath, 'utf8');
    Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key]);
    });
    return html;
};

type EmailData = {
    headerTitle?: string;
    recipientName?: string;
    emailBody?: string;
    callToActionLink?: string;
    currentYear?: string;
    plainTextFallback?: string;
}

const sendEmail = async (to: string, subject: string, templateName: string, data: EmailData = {}) => {
    try {
        const templatePath = path.join(__dirname, templateName);
        const html = renderTemplate(templatePath, data);

        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME || 'No Reply'}" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text: data.plainTextFallback || 'Please enable HTML view.',
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${to}`);
    } catch (err) {
        if (err instanceof Error) {
            console.error(`❌ Failed to send email to ${to}:`, err.message);
        } else {
            console.error(`❌ Failed to send email to ${to}:`, err);
        }
    }
};

type UserData = {
    name: string;
    email: string;
    message?: string;
};

// const notifyUser = async (userData:UserData) => {
//   const data = {
//     headerTitle: "Thank You for Your Message!",
//     recipientName: userData.name,
//     emailBody: `We have received your submission. Here's a copy of your message: <p><em>"${userData.message || 'No message provided.'}"</em></p>We’ll reply soon.`,
//     callToActionLink: process.env.YOUR_WEBSITE_URL || "https://demo.com",
//     currentYear: new Date().getFullYear(),
//     plainTextFallback: `Dear ${userData.name},\n\nThank you for contacting us.\n\nMessage: "${userData.message}"\n\n- Team`,
//   };

//   await sendEmail({
//     to: userData.email,
//     subject: "We've received your message!",
//     templateName: 'reciverEmailTemplate.html',
//     data,
//   });
// };

module.exports = {
    sendEmail,
};
