const nodemailer = require('nodemailer');
require('dotenv').config();

class Mailer {

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });

    sendEmail = (user, subject, body) => {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: '"Oak Naturo" <oakproject2020@gmail.com>',
                to: `${user.email}`,
                subject: subject,
                text: body
            };
            const self = this;
            self.transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    reject(err);

                } else {
                    resolve();
                }
            });
        })
    }
}

module.exports = Mailer;


