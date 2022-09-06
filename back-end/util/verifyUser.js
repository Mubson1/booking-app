import { verifyToken } from "./verifyToken.js"

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else{
            return res.status(401).json({message:"You are not the authorized user"})
        }
    })
}