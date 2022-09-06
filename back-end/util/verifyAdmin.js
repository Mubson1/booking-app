import { verifyToken } from "./verifyToken.js"

export const verifyAdmin = (req, res, next) => {
        if(req.user.isAdmin){
            next()
        } else {
            return res.status(401).json({message:"Only admin can access this feature"})
        }

}