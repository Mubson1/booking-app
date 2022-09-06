import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controller/user.js'
import { verifyAdmin } from '../util/verifyAdmin.js'
import { verifyToken } from '../util/verifyToken.js'
import { verifyUser } from '../util/verifyUser.js'

const router = express.Router()

router.put('/:id', verifyToken, verifyUser, updateUser)

router.delete('/:id',verifyToken, verifyUser, deleteUser)

router.get('/', verifyToken, verifyAdmin, getUsers)

router.get('/:id', verifyToken, verifyUser, getUser)

export default router
