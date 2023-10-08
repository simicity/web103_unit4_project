import express from 'express'

import DrinksController from '../controllers/drinks.js'

const router = express.Router()

router.get('/', DrinksController.getDrinks)
router.get('/:id', DrinksController.getDrinkById)
router.post('/', DrinksController.createDrink)
router.patch('/:id', DrinksController.updateDrink)
router.delete('/:id', DrinksController.deleteDrink)

export default router