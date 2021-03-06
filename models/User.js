const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 

    name : {
          type : String,
          trim : true,
          required : true,
          min : 3,
          max : 30,
    },
    
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true,
        min : 7,
        max : 50,
    },

    password : {
        type : String,
        required : true,
        trim : true,
        min : 5,
        max : 30
   },

    //because image is just a string url 
    profilepic : {
        type : String,
        default : '',
    },

    bgpic : {
        type : String,
        default : '',
    },
    
    isAdmin : {
        type : Boolean,
        default : false,
    },

    posts : [{
        type : mongoose.Types.ObjectId,
        ref : 'Post',
        required : true
    }],
    
    followers : [{
        type : mongoose.Types.ObjectId,
        ref : 'User',
        default : [], 
    }],
    
    following : [{
        type : mongoose.Types.ObjectId,
        ref : 'User',
        default : [], 
    }],
    joined_date : {
        type : Date,
        default : Date.now
    },
    
    // activated : {
    //      type : Boolean,
    //      default : false
    // },
    
    // token : {
    //    type : String
    //     },
    //one user can have multiple places so []

},
{ timestamps : true }
);

module.exports = mongoose.model('User', UserSchema); 