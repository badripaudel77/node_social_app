const express = require('express')

const dotenv = require('dotenv')

const app = express()

//dont need bodyParser for parsing json
app.use(express.json())

//load the config file
dotenv.config({path: './config/config.env' })


app.listen(process.env.PORT, () => {
    console.log(`Server started running at PORT : ${process.env.PORT}` )
})