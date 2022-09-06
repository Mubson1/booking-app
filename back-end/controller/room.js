import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms:savedRoom._id}})
        } catch(error){
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)   
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        console.log(updatedRoom)
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try{
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms:req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted")
    } catch(error) {
        next(error)
    }
}

export const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch(error) {
        next(error)
    }
}

export const getRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch(error) {
        next(error)
    }
}

export const updateAvailability = async (req, res, next) => {
    console.log(new Date())
    try {
        await Room.updateOne({"roomNumbers._id": req.params.id}, {
            $push: {
                //updating the nested properties
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json("Room status has been updtes")
    } catch (error) {
        next(error)
    }
}