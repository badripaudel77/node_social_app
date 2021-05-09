const express = require('express')

const router = express.Router()

const { registerUser, welcomeUser } = require('../controllers/userController');
const authenticateUser = require('../middleware/auth');

//TODO : ...

//register user
router.get("/", welcomeUser);

router.post('/register', registerUser)

//apply middleware for protected paths / urls
//router.use(authenticateUser)

module.exports = router