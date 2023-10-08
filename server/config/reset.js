import { pool } from './database.js'
import './dotenv.js'

const createMilksTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS drinks;
    DROP TABLE IF EXISTS milks;

    CREATE TABLE IF NOT EXISTS milks (
        name VARCHAR(30) PRIMARY KEY,
        price REAL NOT NULL,
        image VARCHAR(1000)
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 milks table created successfully')
  } catch (err) {
    console.error('⚠️ error creating milks table', err)
  }
}

const createSpicesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS spices;

    CREATE TABLE IF NOT EXISTS spices (
        name VARCHAR(30) PRIMARY KEY,
        price REAL NOT NULL,
        image VARCHAR(1000)
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 spices table created successfully')
  } catch (err) {
    console.error('⚠️ error creating spices table', err)
  }
}

const createSyrupsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS syrups;

    CREATE TABLE IF NOT EXISTS syrups (
        name VARCHAR(30) PRIMARY KEY,
        price REAL NOT NULL,
        image VARCHAR(1000)
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 syrups table created successfully')
  } catch (err) {
    console.error('⚠️ error creating syrups table', err)
  }
}

const createDrinksTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS drinks;

    CREATE TABLE IF NOT EXISTS drinks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        milk VARCHAR(30) REFERENCES milks(name) NOT NULL,
        spice VARCHAR(30) REFERENCES spices(name) NOT NULL,
        syrup VARCHAR(30) REFERENCES syrups(name) NOT NULL,
        iced BOOLEAN DEFAULT FALSE,
        price REAL NOT NULL
    )
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 drinks table created successfully')
  } catch (err) {
    console.error('⚠️ error creating drinks table', err)
  }
}

// await createMilksTable()
// await createSpicesTable()
// await createSyrupsTable()
await createDrinksTable()