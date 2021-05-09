const express = require('express')

const router = express.Router()

const { registerUser, welcomeUser } = require('../controllers/userController')

//TODO : ...

//register user
router.get("/", welcomeUser);
router.post('/register', registerUser)

module.exports = router