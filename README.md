# Rate Limiter
A basic rate limit middleware for use in express applications. Customizable to work with IPs, headers, and more.


## getRateLimiter()
A factory function for building rate limiter middlewares

**Arguments**
- `nRequests:number` -> the maximum number of requests allowed in a time frame per unique key. 
- `selector:((req:Request)=>(string|number))` -> a selector function that returns some unique property of the request to track user usage. 
- `cooldown_ms:number` -> default is 60_0000 (1 minute)


**Returns**
* A middleware function that can be used on express endpoints to enforce rate limits. 


## IPSelector()
The default selector for a rateLimiter. It simply returns the ipAddress of the request object. 

**Arguments** 
- `req:Request` -> the request object 

**Returns** 
* A `string` which is the IP address of the request sender
    
