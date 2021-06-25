const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp')

module.exports = async (email) => {
  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  await transporter.sendMail({
    text: email.text,
    subject: email.subject,
    from: `Equipe Adapto <${SMTP_CONFIG.user}`,
    to: [SMTP_CONFIG.user, email.user]
  })
}
