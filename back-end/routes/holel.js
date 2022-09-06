import express, { Router } from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from '../controller/hotel.js'
import {verifyAdmin} from '../util/verifyAdmin.js'
import { verifyToken } from '../util/verifyToken.js'

const router = express.Router()

router.post('/',verifyToken, verifyAdmin, createHotel)

router.put('/:id',verifyToken, verifyAdmin, updateHotel)

router.delete('/:id',verifyToken, verifyAdmin, deleteHotel)

router.get('/find/:id', getHotel)

router.get('/', getHotels)

router.get('/count', countByCity)

router.get('/countByType', countByType)

router.get('/room/:id', getHotelRooms)





export default router