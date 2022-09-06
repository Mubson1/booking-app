import express, { application } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userAuthentication from './routes/userAuthentication.js'
import user from './routes/user.js'
import hotel from './routes/holel.js'
import room from './routes/room.js'
import cors from 'cors'

const app = express();

//connecting with the mongodb
dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_KEY)
        console.log('connected to database')
    } catch (error) {
        throw error
    }
}

//middlewares
app.use(cors())
app.use(express.json())
app.use('/api/authentication', userAuthentication)
app.use('/api/users', user)
app.use('/api/hotel', hotel)
app.use('/api/room', room)



//handling error using middleware
app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Oops! Something went wrong."

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
    })
})

//connecting with the server
app.listen(8800, () => {
    connect()
    console.log('connected to backend')
})