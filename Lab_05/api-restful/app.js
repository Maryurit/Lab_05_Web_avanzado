const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");


// Middleware
app.use(express.json()); // Para leer JSON en las solicitudes
app.use(cors()); // Permitir solicitudes de otros dominios
app.use(morgan("dev")); // detalles de cada petición

// Importamos los módulos de rutas
const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");

// Rutas bases
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);

// middleware global de errores
app.use(errorHandler);

// Mensaje de prueba en la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API RESTful!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
