const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY,
      },
      logger: true,   // ✅ logs detallados en consola
      debug: true,    // ✅ conversación SMTP
      tls: {
        rejectUnauthorized: false // ✅ evita error "self-signed certificate"
      }
    });
  }

  async sendEmail(options) {
    console.log("📨 Intentando enviar correo a:", options.to); // log de depuración

    const { to, subject, htmlBody } = options;

    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAILER_EMAIL,
        to: to,
        subject: subject,
        html: htmlBody,
      });

      console.log("✅ Email enviado:", info.response);
      return true;
    } catch (error) {
      console.error("❌ Error enviando email:", error);
      return false;
    }
  }
}

module.exports = EmailService;
