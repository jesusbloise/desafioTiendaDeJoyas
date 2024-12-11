const express = require('express');
const logger = require('./src/middleware/logger');
const joyasRoutes = require('./src/routes/joyasRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Rutas
app.use('/api', joyasRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
