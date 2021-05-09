const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const router = require('../routes/postRoutes')

//load the config file
dotenv.config({path: './config/config.env' });

//register the user
const registerUser = async (req, res, next) => {
    const { name, email , password } = req.body;

    let doesUserExist;
    let token;

    if(name.length <3 || email.length<7 || password.length<5) {
        return res.status(500).json({registerError: "Please use longer fields"})
    }
    try {
        doesUserExist  = await User.findOne({ email : email });
        if(doesUserExist) {
            return res.status(500).json({registerError: "That Email Already Exists, Please use another one."})
        }
        else {
            //hash the password
             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
             const newUser = new User({
                        name,
                        email,
                        password : hashedPassword,
              });

         try {
                await newUser.save()    
                //user saved and email sent so now can generate token 
                token = jwt.sign({userId : newUser._id, email : newUser.email},
                    process.env.token_secret,
                { expiresIn : '7h' });
         } 
         catch (error) {
            return res.status(500).json({registerError: "Couldn't signed up, try again."})
         }
         return res.status(200).json({registerUserMessage : 'User Registered Successfully',
                    _id : newUser._id, email : newUser.email, 
                    token
             });
        }
    }
     catch (error) {
        return res.status(500).json({registerError: "Couldn't signed up, try again."})
    }
}
const welcomeUser = (req, res, next) => {
    res.json({welcome : 'register'})
}

module.exports = {
    registerUser,
    welcomeUser,
}
