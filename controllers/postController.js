const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Post = require('../models/Post');
const User = require('../models/User');
const { findOneAndRemove } = require('../models/User');

//load the config file
dotenv.config({path: './config/config.env' });

//getting all posts of one user by userId
const getAllPosts = async (req, res, next) => {
    const userId = req.params.userId

    let posts, user
    
    try {
        user = await User.findById(userId)
        if(!userId || !user) return res.status(404).json({ error : "No user found"})

        posts = await Post.find({owner : userId})
        if(posts.length == 0) return res.status(404).json({message : "No posts found."})
        return res.status(404).json({message : posts})
    }
    catch(error) {
        return res.status(500).json({message : "Something went wrong " + errro.message})
    }
}

//creating a new post
const createPost = async (req, res, next) => {
    const { title, image, owner } = req.body
    if(title.length < 3 || owner == null) return res.status(400).json({error : "User and Title fields are required "})

    if(!mongoose.isValidObjectId(owner)) return res.status(404).json({ error : 'This user isn\'t a valid user'})

    if(!(req.user.userId === owner)) return res.status(401).json({error : "you're not authorized to perform this operation"})

    const post = new Post({
        title,
        image,
        owner,
    })

    let user
    try {
        user = await User.findById(owner)
        if(!user) return res.status(404).json({error : "No user found"})
        await post.save()
        await user.updateOne({$push : { posts : post}})
        //return res.status(201).json({ message : { "post" : post }})
        return res.status(201).json({ message : post})

    } 
    catch (error) {
        return res.status(500).json({error : "Something went wrong while creating post" + error.message})
    }
}

//updating a post
const updatePost = async (req, res, next) => {
    //only description can be updated
    const { title } = req.body
    const postId = req.params.postId

    if(!postId) res.status(400).json({error : "No post id found"})
    
    if(title.length < 3) res.status(400).json({error : "Title fields is required [min lenght 3]"})

    if(!mongoose.isValidObjectId(req.body.idToFollow)) return res.status(404).json({ error : 'This user isn\'t a valid user'})
    
    let post
    try {
        if(!mongoose.isValidObjectId(postId)) return res.status(404).json({ error : "Not a valid post id"})
        post = await Post.findById(postId)
        if(!post) return res.status(404).json({error : "No post found"})
        
        if(!(req.user.userId === post.owner.toString())) res.status(401).json({error : "you're not authorized to update this post"})
        
        post.title = title
        await post.save()
        return res.status(200).json({ message : "Post Updated"})
    } 
    catch (error) {
        return res.status(404).json({error : "Something went wrong on network " + error.message})
    }
}

//delete post
const deletePost = async (req, res, next) => {
    const postId = req.params.postId
    if(!postId) return res.status(404).json({error : 'No post Id found'})
    if(!(mongoose.isValidObjectId(postId))) return res.status(401).json({ error : "This post id isn't valid"})

    let post, user
    try {
        post = await Post.findById(postId)
        if(!post) return res.status(404).json({ error : "No post found"})

        if(!(post.owner.toString() === req.user.userId)) return res.status(401).json({error : "you'e not authorized to delete this post"})

        user = await User.findById(req.user.userId)
        if(!user) return res.status(404).json({ error : "No user found"})

        await Post.findByIdAndDelete(postId)
        await user.updateOne({$pull : { posts : postId}})   
        return res.status(200).json({ message : `Post with post id  postId ${postId} got deleted.`})     
    } 
    catch (error) {
         return res.status(500).json({error : "Something went wrong while deleting this post, " + error.message})    
    }
}

module.exports = {
    getAllPosts,
    createPost, 
    updatePost,
    deletePost,
}