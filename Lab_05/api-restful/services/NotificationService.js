const { v4: uuidv4 } = require("uuid");
const NotificationRepository = require("../repositories/NotificationRepository");
const EmailService = require("./email/EmailService");

class NotificationService {
  constructor() {
      this.repo = new NotificationRepository();
      this.emailService = new EmailService();
    }

  create(type, message, ticketId) {
    const notification = {
      id: uuidv4(),
      type,
      message,
      status: "pending",
      ticketId
    };
    if (type === "email") {
    console.log("📨 Intentando enviar correo a:", "maryoritnalvarte@gmail.com"); // 👈 debug
    this.emailService.sendEmail({
      to: "maryurit.nalvarte@tecsup.edu.pe",
      subject: "API RESTful - Alertas del sistema de Tickets",
      htmlBody: "<h1>" + message + "</h1>"
    });
  }}
}
module.exports = NotificationService;
