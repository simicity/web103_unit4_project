import express from 'express'

import SyrupsController from '../controllers/syrups.js'

const router = express.Router()

router.get('/', SyrupsController.getSyrups)

export default router