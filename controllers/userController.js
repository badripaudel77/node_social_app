const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const User = require('../models/User')


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
            return res.status(500).json({error: "That Email Already Exists, Please use another one."})
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
            return res.status(500).json({error: "Couldn't signed up, try again."})
         }
         return res.status(200).json({message : 'User Registered Successfully',
                    _id : newUser._id, email : newUser.email, 
                    token
             });
        }
    }
     catch (error) {
        return res.status(500).json({error: "Couldn't signed up, try again."})
    }
}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password)  return res.status(500).json({error : "Fields can't be empty"})
        
    try {
            const user = await User.findOne({ email })
            if(!user) {
                return res.status(500).json({ error : "This Email hasn't been registered yet."})             
            } 

            const userPassword = await bcrypt.compare(password, user.password)
            if(!userPassword) return res.status(400).json({error : "credentials didn't match with our records"})
    
             //user saved and email sent so now can generate token 
             const token = jwt.sign({userId : user._id, email : user.email},
                process.env.token_secret,
            { expiresIn : '7h' });

            res.header('authorization');
            return res.status(200).json({message : token, email : user.email})
    
        } 
        catch (error) {
            return res.status(500).json({ message : "Something went wrong while logging in."})             
        }
    }

const welcomeUser = (req, res, next) => {
    res.json({welcome : 'register'})
}

module.exports = {
    registerUser,
    userLogin,
    welcomeUser,
}
