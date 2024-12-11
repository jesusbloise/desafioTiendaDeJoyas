const { getJoyas, filterJoyas } = require('../models/inventario');

const fetchJoyas = async (req, res, next) => {
  try {
    const { limits, page, order_by } = req.query;
    const joyas = await getJoyas(limits, page, order_by);

    const data = joyas.map((joya) => ({
      ...joya,
      links: { self: `/joyas/${joya.id}` },
    }));

    res.json({
      total: data.length,
      joyas: data,
    });
  } catch (error) {
    next(error);
  }
};

const fetchFilteredJoyas = async (req, res, next) => {
  try {
    const filters = req.query;
    const joyas = await filterJoyas(filters);
    res.json(joyas);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchJoyas,
  fetchFilteredJoyas,
};
