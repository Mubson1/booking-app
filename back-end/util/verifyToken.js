import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export const verifyToken = (req, res, next) => {
    //server sends a header that contains the jwt
    const authorization = req.headers.authorization
    try {
        if (!authorization) return res.status(401).json({message: 'You are not authorized'})

        const data = jwt.verify(
            authorization,
            process.env.JWT_SECRET_KEY
        )
        req.user = data;
        next()
    }catch (error) {
        return res.status(403).json(error)
    }
    
}