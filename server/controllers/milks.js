import { pool } from '../config/database.js'

const getMilks = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM milks ORDER BY name ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getMilks
}