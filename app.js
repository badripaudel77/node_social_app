const express = require('express')
const app = express()

app.listen(3001 || process.env.PORT, () => {
    console.log("Server started running ")
})