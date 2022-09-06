import express from 'express'
import { forgotPassword, login, passwordReset, signup, verify } from '../controller/userAuthentication.js'

const router = express.Router()

router.post('/login', login)

router.post('/signup', signup)

router.put('/verify-email', verify)

router.put('/forgot-password/:email', forgotPassword )

router.put('/:passwordResetCode/reset-password', passwordReset)

export default router