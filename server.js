const express=require('express')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const env=require("./src/env/env")

const Twitter=require('twitter')
let Client = new Twitter({
	consumer_key: env.twitter.consumer_key,
	consumer_secret: env.twitter.consumer_secret,
	access_token_key: env.twitter.access_token_key,
	access_token_secret:env.twitter.access_token_secret 
});

const PORT=8080

app.get("/twitter",(req,res)=>{
	let params={screen_name:req.query.user}
	Client.get('users/show.json',params,(error, data, response)=>{
		if (error){
			res.status(response.status).json({message:"failed"})
		}	
		data.show={key:"Influence",value:data.followers_count}
		res.json(data)
	})
})

app.listen(PORT,()=>{
	console.log("connected on "+PORT)
})
