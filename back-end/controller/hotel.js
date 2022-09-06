import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'
import pkg from 'mongoose';
import mongoose from 'mongoose';
const {ObjectId} = pkg

export const createHotel = async (req, res, next) => {
    const {name} = req.body;
    try {
        const check = await Hotel.findOne({name});
        if(check) return res.status(409).json({"message": "name already taken"})
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (error){
        next(error)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query
    try{
        const hotels = await Hotel.find({...others, 
            cheapestPrice: {$gte: min || 1, $lte: max || 3000}
        }).limit(req.query.limit)   //shows the first 5(limit) that is given in the query
        res.status(200).json(hotels)
    } catch(error) {
        next(error)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type: "hotel", count:hotelCount },
            {type: "apartment", count:apartmentCount },
            {type: "resort", count:resortCount },
            {type: "villa", count:villaCount },
            {type: "cabin", count:cabinCount }
        ])

    } catch (error) {
        next(error)
    }
}

export const getHotelRooms = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const rooma = await Room.findById('630ed2ab00f7d11558054ff4')
        //Promise.all is used because there are multiple rooms
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(mongoose.Types.ObjectId(room))
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}