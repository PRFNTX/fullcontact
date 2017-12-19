import axios from "axios"
import env from "../env/env"
import Twitter from "twitter"

class SocialCalls{

	Facebook(data){
		//take the original api data and get the facebook data, return an axios call
	}

	Twitter=(data)=>{
		let splitTwit=data.twitter.split("/")
		let user=splitTwit[splitTwit.length-1]
		return axios.get("/twitter?user="+user)
	}

	Instagram(data){
		//ditto for twitter
	}
}

export default new SocialCalls()


			//return axios.get("https://api.twitter.com/1.1/users/show/followers_count.json?screen_name="+user,{
			//	headers:{
			//		Accept: "*/*",
			//		Connection: 'close',
			//		'User-Agent': 'OAuth gem v0.4.4',
			//		'Content-Type': 'application/x-www-form-urlencoded',
			//		Authorization: env.twitter_auth_string(),
			//		'Content-Length': 76,
			//		Host: 'api.twitter.com',
			//		status:'status',
			//	}
			//})
