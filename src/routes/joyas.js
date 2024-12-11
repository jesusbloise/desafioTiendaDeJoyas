const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Ruta principal con HATEOAS
router.get('/joyas', async (req, res, next) => {
  try {
    const { limits, page, order_by } = req.query;

    let query = 'SELECT * FROM inventario';
    if (order_by) {
      const [field, direction] = order_by.split('_');
      query += ` ORDER BY ${field} ${direction.toUpperCase()}`;
    }

    if (limits && page) {
      query += ` LIMIT $1 OFFSET $2`;
    }

    const params = [limits || 10, (page - 1) * limits || 0];
    const result = await db.query(query, params);

    const data = result.rows.map((joya) => ({
      ...joya,
      links: { self: `/joyas/${joya.id}` },
    }));

    res.json({
      total: data.length,
      joyas: data,
    });
  } catch (error) {
    next(error); // Pasar error al middleware global
  }
});

// Ruta de filtros
router.get('/joyas/filtros', async (req, res, next) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;

    const conditions = [];
    const params = [];

    if (precio_max) {
      conditions.push(`precio <= $${conditions.length + 1}`);
      params.push(precio_max);
    }
    if (precio_min) {
      conditions.push(`precio >= $${conditions.length + 1}`);
      params.push(precio_min);
    }
    if (categoria) {
      conditions.push(`categoria = $${conditions.length + 1}`);
      params.push(categoria);
    }
    if (metal) {
      conditions.push(`metal = $${conditions.length + 1}`);
      params.push(metal);
    }

    const query = `SELECT * FROM inventario ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''}`;
    const result = await db.query(query, params);

    res.json(result.rows);
  } catch (error) {
    next(error); // Pasar error al middleware global
  }
});

module.exports = router;
