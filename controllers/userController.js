const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

//load the config file
dotenv.config({path: './config/config.env' });

const getUser = async (req, res, next) => {

    try {
        // don't include password.  
        const user = await User.findById(req.user.userId).select('-password'); 
        return res.status(200).json({"message" : user})

    } catch (error) {
        return res.status(500).json({error : "User couldn't found."})
    }
}

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
         res.header('auth_token');
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

            res.header('auth_token') //set the header
            return res.status(200).json({message : "login Successfully done",token : token, email : user.email})
        } 
        catch (error) {
            return res.status(500).json({ message : "Something went wrong while logging in."})             
        }
    }

const userUpdate = async (req, res, next) => {
    const userId = req.params.userId
    const { password } = req.body

    //if(!mongoose.isValidObjectId(userId))

    let user

    try {
         user = await User.findById(userId)
    } 
    catch (error) {
        return res.status(500).json({ error : 'Something went wrong'})    
    }

    if(!user) return res.status(404).json({ error : 'User with that user Id not found.'})

    if(!(req.user.userId === user._id.toString())) return res.status(401).json( { error : "You're not authorized to perform this action."})
    
     //hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt)

    try {
        await User.findByIdAndUpdate(userId, { password : hashedPassword })
        return res.status(200).json({ message : 'Your password has been updated'})    
    } 
    catch (error) {
        return res.status(404).json({ error : 'Couldn\'t update your password'})
    }
} 

//follow the user
const followUser = async (req, res, next) => {
    const id = req.params.id
    const { idToFollow } = req.body

    if(!(id === req.user.userId)) return res.status(404).json({ error : 'You\'re not authorized to perform this operation'})        

    if(req.user.userId === idToFollow) return res.status(401).json({ error : 'You can\'t follow yourself'})        

    if(!idToFollow) return res.status(404).json({ error : 'User\'s ID to follow not found'})

    if(!mongoose.isValidObjectId(req.body.idToFollow)) return res.status(404).json({ error : 'This user isn\'t a valid user'})
    try {
        const user = await User.findById(idToFollow)
        const currentUser = await User.findById(req.user.userId)

        if(currentUser.following.includes(idToFollow)) {
            return res.status(401).json({ error : 'You have already followed this user'})
        }
        //update both user[followers] and currentuser[following]
        await user.updateOne({$push : { followers : req.user.userId}})
        await currentUser.updateOne({$push : { following : idToFollow}})
       
        return res.status(201).json({ message : "You have followed this user"})
    } 
    catch (error) {
        return res.status(500).json({ error : 'Couldn\'t follow this user, server error'})        
    }
}

//unfollow the user
const unfollowUser = async (req, res, next) => {
    const id = req.params.id
    const { idToUnfollow } = req.body

    if(!(id === req.user.userId)) return res.status(404).json({ error : 'You\'re not authorized to perform this operation'})        

    if(req.user.userId === idToUnfollow) return res.status(401).json({ error : 'You can\'t unfollow yourself'})        

    if(!idToUnfollow) return res.status(404).json({ error : 'User\'s ID to unfollow not found'})

    if(!mongoose.isValidObjectId(req.body.idToUnfollow)) return res.status(404).json({ error : 'This user isn\'t a valid user'})
    try {
        const user = await User.findById(idToUnfollow)
        const currentUser = await User.findById(req.user.userId)

        if(!(currentUser.following.includes(idToUnfollow))) {
            return res.status(401).json({ error : 'This user isn\'t your follower'})
        }
        //update both user[followers] and currentuser[following]
        await user.updateOne({$pull : { followers : req.user.userId}})
        await currentUser.updateOne({$pull : { following : idToUnfollow}})
       
        return res.status(201).json({ message : "You have followed this user"})
    } 
    catch (error) {
        return res.status(500).json({ error : 'Couldn\'t follow this user, server error'})        
    }
}


const getFollowers = async (req, res, next) => {
    const userId = req.params.userId

    if(!userId) return res.status(401).json({ error : 'Unauthorized to perform this action[no user id found]'})
    
    if(!mongoose.isValidObjectId(userId)) 
    return res.status(401).json({ error : 'Unauthorized to perform this action[not a valid user]'})

    //if(!(userId === req.user.userId)) return res.status(401).json({ error : 'you can\'t see other person\'s followers'})

    const currentUser = await User.findById(userId)
    if(!currentUser) return res.status(401).json({ error : 'Unauthorized to perform this action[no user found with this id]'})

    return res.status(200).json({message :  currentUser.followers})
}

const getFollowing = async (req, res, next) => {
    const userId = req.params.userId


    if(!userId) return res.status(401).json({ error : 'Unauthorized to perform this action[no user id found]'})
    
    if(!mongoose.isValidObjectId(userId)) 
    return res.status(401).json({ error : 'Unauthorized to perform this action[not a valid user]'})

    //if(!(userId === req.user.userId)) return res.status(401).json({ error : 'you can\'t see other person\'s followers'})

    const currentUser = await User.findById(userId)
    if(!currentUser) return res.status(401).json({ error : 'Unauthorized to perform this action[no user found with this id]'})

    return res.status(200).json({message :  currentUser.following})
}

const welcomeUser = (req, res, next) => {
    res.json({welcome : 'register'})
}

module.exports = {
    welcomeUser,
    registerUser,
    userLogin,
    userUpdate,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getUser
}
