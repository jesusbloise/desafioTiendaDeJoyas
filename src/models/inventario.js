const db = require('../db/database');

const getJoyas = async (limits, page, order_by) => {
  let query = 'SELECT * FROM inventario';
  const params = [];

  if (order_by) {
    const [field, direction] = order_by.split('_');
    query += ` ORDER BY ${field} ${direction.toUpperCase()}`;
  }

  if (limits && page) {
    query += ` LIMIT $1 OFFSET $2`;
    params.push(limits || 10, (page - 1) * limits || 0);
  }

  const result = await db.query(query, params);
  return result.rows;
};

const filterJoyas = async ({ precio_max, precio_min, categoria, metal }) => {
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

  const query = `SELECT * FROM inventario ${
    conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  }`;
  const result = await db.query(query, params);
  return result.rows;
};

module.exports = {
  getJoyas,
  filterJoyas,
};
