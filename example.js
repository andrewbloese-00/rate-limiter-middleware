import  express  from 'express'


import {
	getRateLimiter, //constructs a rate limiting middleware based on configuration
	IPSelector //the default selector function, returns the request.socket.remoteAddress value 
} from './limit.js'

const app = express()

//creates a rate limiter to 5 requests every 10 seconds, utilizing the request ip address to track usage 
const testLimiter = getRateLimiter(5,IPSelector,10_000)


//each user can request this endpoint at most 5 times every 10 seconds
app.get("/", testLimiter, (req,res)=>{
	res.status(200).send("You made it!")
})


//start server on 8080
app.listen(8080,
	()=>console.log("Example Application Listening: \n > http://localhost:8080/")
)


