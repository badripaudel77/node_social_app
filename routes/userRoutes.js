const express = require('express')

const router = express.Router()

const { registerUser, userLogin, welcomeUser } = require('../controllers/userController');
const authenticateUser = require('../middleware/auth');

//TODO : ...

//register user
router.get("/", welcomeUser);

router.post('/register', registerUser)
router.post('/login', userLogin)


//apply middleware for protected paths / urls
//router.use(authenticateUser)

module.exports = router