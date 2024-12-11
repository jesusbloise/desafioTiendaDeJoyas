const express = require('express');
const {
  fetchJoyas,
  fetchFilteredJoyas,
} = require('../controllers/inventarioController');
const router = express.Router();

// Ruta principal con HATEOAS
router.get('/joyas', fetchJoyas);

// Ruta de filtros
router.get('/joyas/filtros', fetchFilteredJoyas);

module.exports = router;
