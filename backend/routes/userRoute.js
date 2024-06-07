import express from 'express'
import { forgetPassController, loginController,apiController } from '../controllers/userController.js'
 const router = express.Router()


router.post('/login',loginController)
router.post('/forget-password',forgetPassController)
router.post('/set-api',apiController)


export default router