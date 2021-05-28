const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    try {

         const token = req.header('auth_token') 
         console.log('token / ' + token  ) // see if the token has been sent in header
         
         //anything like this can be used because 
        //auth_token or Bearer token is what we send from postman or brower in request. 
        // just code according to that.
        
        //Bearer token
        //const token = req.headers.authorization.split(' ')[1] 

        if(!token) return res.status(401).json({error : 'No token found, please try again by signin up.' })
            
        else {
            //get the decoded value
            const decodedToken = jwt.verify(token, process.env.token_secret)

            //send userId as user attached to the user so that we can access it via req.user.userId
            //userId was set while generating token
            req.user = { userId : decodedToken.userId }
            
            //continue
            next()
        }
    } 
    catch (error) {
        return res.status(401).json({error : "Token Is not a valid token"})
    }
}
module.exports = authenticateUser