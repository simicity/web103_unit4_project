import express from 'express'

import MilksController from '../controllers/milks.js'

const router = express.Router()

router.get('/', MilksController.getMilks)

export default router