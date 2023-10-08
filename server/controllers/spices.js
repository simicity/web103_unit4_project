import { pool } from '../config/database.js'

const getSpices = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM spices ORDER BY name ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getSpices
}