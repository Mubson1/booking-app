import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        
        //sending new token after the user has been verified
        const {_id: id, username, email, password, country, img, city, phone, isAdmin, isVerified} = updatedUser
        await jwt.sign(
            {id, username, email, password, country, img, city, phone, isAdmin, isVerified},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '2d'},
            (err, token) => {
                if (err) return res.sendStatus(500)
                res.status(200).json({token})
            })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}