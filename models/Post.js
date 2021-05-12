const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title  : {
        type : String, 
        min : 3,
        max : 300,
        required : true,
        trim : true
    },
    
    //because image is just a string url 
    image : {
        type : String,
    },
       //one place can only belong to one owner
    owner : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }, 
    likes : {
        type : Array,
        default : [],
    }
})

module.exports = mongoose.model('Post', PostSchema); 