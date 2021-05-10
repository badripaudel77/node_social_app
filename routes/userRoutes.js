const express = require('express')

const router = express.Router()

const { 
    welcomeUser,
    registerUser,
    userLogin,
    userUpdate,
    followUser,

} = require('../controllers/userController');
const authenticateUser = require('../middleware/auth');

//TODO : ...

//register user
router.get("/", welcomeUser);

router.post('/register', registerUser)
router.post('/login', userLogin)


//apply middleware for protected paths / urls
router.use(authenticateUser)

//update user
router.put('/update/:userId', userUpdate)
router.patch('/follow/:id', followUser)


module.exports = router