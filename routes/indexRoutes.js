const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    //console.log("req is : " + req.baseUrl)
    res.json({welcome : 'Welcome to Lockdown Communication Applicatio.'})
})

module.exports = router