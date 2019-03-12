const nodemailer = require('nodemailer');
const keys = require('../config/keys');


async function sendMail(sender, link) {

    let transporter = nodemailer.createTransport({
        service: keys.mailerService,
        auth: {
            user: keys.mailerUserName, // generated ethereal user
            pass: keys.mailerPass // generated ethereal password
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: keys.mailerFrom, // sender address
        to: sender, // list of receiver
        subject: "Password reset", // Subject line
        html: `<p>You are receiving this because you have requested the reset of password.Click the link for resetting the password <a href="${link}">${link}</p>`,
    }
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
    // console.log(info)
}

//   main().catch(console.error);
module.exports.sendMail = sendMail;