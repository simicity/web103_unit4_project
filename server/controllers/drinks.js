import { pool } from '../config/database.js'

const getDrinks = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM drinks ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

const getDrinkById = async (req, res) => {
  try {
    const selectQuery = `SELECT name, milk, spice, syrup, iced, price FROM drinks WHERE id=$1`
    const drinkId = req.params.id
    const results = await pool.query(selectQuery, [drinkId])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message} )
  }
}

const createDrink = async (req, res) => {
  try {
    const { name, milk, spice, syrup, iced, price } = req.body
    const results = await pool.query(`
      INSERT INTO drinks (name, milk, spice, syrup, iced, price)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [name, milk, spice, syrup, iced, price]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

const updateDrink = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, milk, spice, syrup, iced, price } = req.body
    const results = await pool.query(`
      UPDATE drinks SET name = $1, milk = $2, spice = $3, syrup = $4, iced = $5, price=$6 WHERE id = $7`,
      [name, milk, spice, syrup, iced, price, id]
    )
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

const deleteDrink = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM drinks WHERE id = $1', [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
} 

export default {
  getDrinks,
  getDrinkById,
  createDrink,
  updateDrink,
  deleteDrink
}