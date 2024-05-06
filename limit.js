const HTTP_TOO_MANY_REQUESTS = 429

export const IPSelector = req => req.socket.remoteAddress
export function getRateLimiter(nRequests,selector=IPSelector,cooldown_ms=60_000){
	const r = {}
	return (req,res,next) => {
		const key = selector(req)
		const now = Date.now()
		if(!r[key]) r[key] = [now]
		else {
			//remove 'old' request timestamps 
			const cutoff = now-cooldown_ms;

			while(r[key].length > 0 && r[key][0] <= cutoff){
				r[key].shift();
			}
			
			if(r[key].length > nRequests) {
				console.warn(`[${key}] EXCEEDED RATE LIMIT on:  "${req.protocol + '://' + req.get('host') + req.originalUrl}"` )
				return res.status(HTTP_TOO_MANY_REQUESTS).send("Rate Limit Exceeded")
			}

			r[key].push(now)
		}

		next()
	} 
}
