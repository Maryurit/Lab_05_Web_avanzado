const TicketService = require("../services/TicketService");
const service = new TicketService();
const NotificationService = require("../services/NotificationService");
const notificationService = new NotificationService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res) => {
  const { page = 1, limit = 5 } = req.query; // valores por defecto
  const tickets = service.list();

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = tickets.slice(startIndex, endIndex);

  res.status(200).json({
    total: tickets.length,
    page: Number(page),
    limit: Number(limit),
    data: results
  });
};

exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.getNotifications = (req, res) => {
  const { id } = req.params;
  const allNotifications = notificationService.list();
  const ticketNotifications = allNotifications.filter(n => n.ticketId === id);

  res.status(200).json(ticketNotifications);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
