import express, { Router } from 'express'
import * as controllers from './controllers'

const router: Router = express.Router()

router.route('*')
  .get(controllers.read)
  .post(controllers.write)
  .patch(controllers.update)
  .delete(controllers.remove)

export default router