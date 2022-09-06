import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { SendEmail } from "../util/SendEmail.js"


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.sendStatus(401)

        const {_id: id, username, email, password, country, img, city, phone, isAdmin, isVerified} = user._doc;

        const isPasswordCorrect = await bcrypt.compare(req.body.password, password)
        if(isPasswordCorrect) {
            // jwt.sign(
            //     {id, username, email, isAdmin, isVerified},
            //     process.env.JWT_SECRET_KEY,
            //     {expiresIn: '7d'},
            //     (err, token) => {
            //         if (err){
            //             res.status(500).json(err)
            //         }
            //         res.status(200).json({token})
            //     }
            // )=

            jwt.sign(
                {id, username, email, country, img, city, phone, isAdmin, isVerified},
                process.env.JWT_SECRET_KEY,
                {expiresIn: '2d'},
                (err, token) => {
                    if (err) return res.sendStatus(500)
                    res.status(200).json({token})
                })
        } else{
            res.sendStatus(401)
        }
    } catch (error) {
        next(error)
    }
}


export const signup = async (req, res, next) => {
    try {
        const {username, email, password, country, img, city, phone} = req.body

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt)

        const verificationString = uuid()

        const newUser = new User({
            username:username,
            email:email,
            password:passwordHash,
            country:country,
            img:img,
            city:city,
            phone:phone,
            isAdmin:false,
            isVerified:false,
            verificationString:verificationString
        })
        await newUser.save();

        //sending email for verification
        try {
            await SendEmail({
                to: email,
                from: 'flammablekarki@gmail.com',
                subject: 'Please Verify Your Email',
                text: 'Thanks for signing up to HYP',
                html: `
                    <h1>Thanks for signing up with HYP</h1>
                    <p>To verify your account, please click the link below:</p>
                    <a href='http://localhost:3000/verify-email/${verificationString}'>Verify email</a>
                `
            })
        } catch (error) {
            console.log(error);
            res.sendStatus(500)   
        }

        jwt.sign(
            { username, email, country, img, city, phone, isAdmin:false, isVerified:false},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '7d'},
            (err, token) => {
                if(err) {
                    res.status(500).json(err)
                }
                res.status(200).json({token})
            }
        )
    } catch (error) {
        next(error)
    }
}


export const verify = async (req, res, next) => {
    try {
        const {verificationString} = req.body;

        const user = await User.findOne({verificationString})
        if(!user) return res.status(401).json({message:'The email verification code is incorrect'})

        const {_id:id, username, email, country, img, city, phone} = user._doc

        await User.updateOne({_id:id}, {$set: {isVerified:true}})

        jwt.sign(
            {id, email, username, country, img, city, phone, isVerified:true},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '7d'},
            (err, token) => {
                if (err) return res.sendStatus(500)
                res.status(200).json({token})
            }
        )
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const {email} = req.params
        const passwordResetCode = uuid()

        const user = await User.updateOne({email}, {$set: {passwordResetCode}}, {timestamps:false})
        
        if (user.modifiedCount > 0) {
            //sending email for reseting password
            try {
                await SendEmail({
                    to: email,
                    from: 'flammablekarki@gmail.com',
                    subject: 'Password Reset',
                    text: 'Password Reset',
                    html: `
                        <h1>Forgot Your Password?</h1>
                        <p>To reset the password, please click the link below:</p>
                        <a href='http://localhost:3000/reset-password/${passwordResetCode}'>Reset Password</a>
                    `
                })
            } catch (error) {
                console.log(e);
                res.sendStatus(500)   
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        next(error)
    }
    
}

export const passwordReset = async (req, res, next ) => {
    try {
        const {passwordResetCode} = req.params
        const {newPassword} = req.body

        const salt = bcrypt.genSaltSync(10)
        const newPasswordHash = bcrypt.hashSync(newPassword, salt)

        const user = await User.findOneAndUpdate({passwordResetCode}, {
            $set: {password: newPasswordHash},
            $unset: {passwordResetCode: ''}
        })
        if(!user) return res.status(401).json({message:"The password reset code is incorrect"})
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
}
