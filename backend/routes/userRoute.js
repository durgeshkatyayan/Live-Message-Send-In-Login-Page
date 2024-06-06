import express from 'express'
import { forgetPassController, loginController } from '../controllers/userController.js'
 const router = express.Router()


router.post('/login',loginController)
router.post('/forget-password',forgetPassController)


export default router