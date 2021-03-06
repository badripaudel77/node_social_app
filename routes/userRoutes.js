const express = require('express')

const router = express.Router()

const { 
    welcomeUser,
    registerUser,
    userLogin,
    getUser,
    userUpdate,
    followUser,
    getFollowers,
    getFollowing,
    unfollowUser,

} = require('../controllers/userController');
const authenticateUser = require('../middleware/auth');

//TODO : ...

//register user
router.get("/", welcomeUser);

router.post('/register', registerUser)
router.post('/login', userLogin)


//apply middleware for protected paths / urls
router.use(authenticateUser)

// get users
router.get('/user', getUser)
//update user
router.put('/update/:userId', userUpdate)
router.patch('/follow/:id', followUser)
router.patch('/unfollow/:id', unfollowUser)
router.get('/followers/:userId', getFollowers)
router.get('/following/:userId', getFollowing)

module.exports = router