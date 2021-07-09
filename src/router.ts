import express, { Router } from 'express'
import * as controllers from './controllers'

const router: Router = express.Router()

router.get('*', controllers.read)
router.post('*', controllers.write)
router.patch('*', controllers.update)
router.delete('*', controllers.remove)

export default router