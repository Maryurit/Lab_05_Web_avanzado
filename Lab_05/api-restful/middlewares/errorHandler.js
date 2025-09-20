function errorHandler(err, req, res, next) {
  console.error(err.stack); // log para depuración

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Error interno del servidor"
  });
}

module.exports = errorHandler;
