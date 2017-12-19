/*
	this file calls the API then renders a component it was provided and sends it the data as a prop.
	it will also apply any functions it was given to the data before passing it.
*/


import React, { Component } from "react"
import "./styles/api-caller.css"
import env from "../env/env"
import test from "../modules/test"
import "@shopify/polaris/styles.css"
import { Button, TextField, Label } from "@shopify/polaris"

import axios from "axios"


class APICaller extends Component{
	constructor(){
		super()
		this.state={
			data:"",
			fieldValue:"",
			filterData:"",
		}
		this.newCall=false
	}
	//this just wraps the data in a promise for uniformity
	async wrap(val){
		val.show={key:"email",value:val.email}
		return {data:val}
	}

    //this is just for showing dummy data
	componentWillMount(){
		this.setState({
			data:test
		})
		this.mapData(test)
	}
	//prevents multiple calls to any apis unless new data is requested
	//TODO fix this incase somone types into the input field before the data is sent.
	componentDidUpdate(){
		if (this.newCall){
			this.mapData(this.state.data)
		}
	}


/// This function takes the data and decides what to do with it before showing it
	mapData=(data)=>{
		
		this.newCall=false
		let mappingData =this.props.secondary.map(secondary_API_call=>{
			if (!(secondary_API_call)){
				//do nothing
				
				return this.wrap(data)
			}
			else {
				//send it to an api
				//or through a provided function
				return secondary_API_call(data).catch(err=>console.log(err))
			}
		})
		Promise.all(mappingData).then(
			results=>{
				this.setState({
					filterData:results.map(val=> val ? val.data : {show:{key:"status",value:"failed"}})
				})
			}
		).catch(err=>console.log(err))
	}
	
	handleSubmit=(e)=>{
		//this is the api call to full contact	
		console.log(e)
		e.preventDefault()
		//react started giving me synthetic events
		//but not always
		this.newCall=true	
		axios.post(
			"https://api.fullcontact.com/v3/person.enrich",
			{email:e.target.elements.email.value},
			{headers:{
				Authorization:"Bearer "+env.api_key,
			}}
		)
		.then(
			result=>{
				console.log("results returned")
				result.data.email=e.target.elements.email.value
				this.setState({
					data:result.data,
				})
			}
		).catch(err=>{
			console.log(err)
			this.setState({
				data:{ email:e.target.elements.email.value,result:"404 from server" }
			})
		})
	}

	render(){
		//set up the provided components
		let DataDisplayer=this.props.use
		let DataHandler
		if (this.state.filterData.length){
			DataHandler=this.state.filterData.map((val,i)=>{
				
				return <DataDisplayer key={i} data={val} />
			})
		}
		else {
			DataHandler = <DataDisplayer data={this.state.data||{}} />
		}
		return(
			<div className="container">
				<form onSubmit={(e)=>{this.handleSubmit(e.nativeEvent)}}>
					<TextField label="Email address: " type="email" name="email" placeholder="e.g. example@email.com" value={this.state.fieldValue} onChange={(newValue)=>this.setState({fieldValue:newValue})} required/>
					<Button submit="true">Submit</Button>
				</form>		
				{DataHandler}
			</div>
		);
	}
}

export default APICaller
