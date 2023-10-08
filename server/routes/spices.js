import express from 'express'

import SpicesController from '../controllers/spices.js'

const router = express.Router()

router.get('/', SpicesController.getSpices)

export default router