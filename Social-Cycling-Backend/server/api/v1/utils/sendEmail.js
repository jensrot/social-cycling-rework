const nodemailer = require('nodemailer');
const previewEmail = require('preview-email');
const inlineCss = require('nodemailer-juice');

require("dotenv").config();

/** Send an email with password reset
 * @param {string} email 
 * @param {string} subject 
 * @param {string} text
 * @param {string} html 
 */
exports.send_email = (email, subject, text, token) => {

    // Generate test SMTP service account from ethereal.email
    nodemailer.createTestAccount((err) => {
        if (err) {
            console.error(`Failed to create a testing account. ${err.message}`);
            return process.exit(1);
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        transporter.use('compile', inlineCss());

        const html =
            `<h2 style="color:blue; font-size: "3rem">Reset your password</h2><br/>
                <a href="http://localhost:3000/reset-password/${token}">Click this link to reset your password</a><br/>
                <p>If you did not request to reset your password, please click this <a href="http://localhost:3000/deny-reset/${token}">link</a>
            `;

        // Message object
        let message = {
            from: `Jens Rottiers <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: subject,
            text: text,
            html: html
        };

        // previewEmail(message);

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(`Error occurred. ${err.message}`);
                return process.exit(1);
            }

            console.log(`Message sent: ${info.messageId}`);
            // Preview only available when sending through an Ethereal account
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        });
    })
}