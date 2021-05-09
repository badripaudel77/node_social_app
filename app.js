const express = require('express')

const dotenv = require('dotenv')

//morgan is the logging middleware
const morgan = require('morgan') 

//import database connection file
const { connectToDB } = require('./config/database')

//import routes
const indexRoutes = require('./routes/indexRoutes')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


const app = express()

//dont need bodyParser for parsing json
app.use(express.json())

//load the config file
dotenv.config({path: './config/config.env' })

//use morgan middleware
app.use(morgan('common'))

//use routes
app.use('/api/', indexRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

connectToDB()
app.listen(process.env.PORT, () => {
    console.log(`Server started running at PORT : ${process.env.PORT}` )
})
