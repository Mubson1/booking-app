import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateAvailability, updateRoom } from '../controller/room.js'
import {verifyAdmin} from '../util/verifyAdmin.js'
import { verifyToken } from '../util/verifyToken.js'

const router = express.Router()

router.post('/:hotelId', verifyToken, verifyAdmin, createRoom)

router.put('/:id', verifyToken, verifyAdmin, updateRoom)

router.delete('/:id/:hotelId', verifyToken, verifyAdmin, deleteRoom)

router.get('/', getRooms)

router.get('/:id', getRoom)

router.put('/availability/:id', updateAvailability)

export default router