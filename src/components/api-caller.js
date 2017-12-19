import React, { Component } from "react"
import "./styles/api-caller.css"
import env from "../env/env"
import test from "../env/test"
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
	
	async wrap(val){
		val.show={key:"email",value:val.email}
		return {data:val}
	}
	/*
	shouldComponentUpdate(nextProps,nextState){
		if (nextState.fieldValue!==this.state.fieldValue){
			return true
		}
		if (nextProps.data && Object.keys(nextProps.data).length){
			if (nextProps.data.email===this.props.data.email){
				console.log("1")
				return false
			}
		} 

		if (!(this.state.filterData) && (nextState.filterData)){
			console.log("3")
			return true
		}

		if (nextState.data){
			if (nextState.data.email!==this.state.data.email){
				console.log("4")
				return true
			}
		}
		console.log("5")
		return false
		
	}
*/
//this is just for showing dummy data
	componentWillMount(){
		this.setState({
			data:test
		})
		this.mapData(test)
	}
	componentDidUpdate(){
		if (this.newCall){
			this.mapData(this.state.data)
		}
	}


/// This function takes the data and decides what to do with it before showing it
	mapData=(data)=>{
		//for testing purposes
		
		this.newCall=false
		let mappingData =this.props.secondary.map(secondary_API_call=>{
			if (!(secondary_API_call)){
				//do nothing
				return this.wrap(data)
			}
			else {
				//send it to an api
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
		
		e.preventDefault()
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
		).catch(err=>console.log(err))
	}

	render(){
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
				<form onSubmit={(e)=>{this.handleSubmit(e)}}>
					<TextField label="Email address: " type="email" name="email" placeholder="e.g. example@email.com" value={this.state.fieldValue} onChange={(newValue)=>this.setState({fieldValue:newValue})} required/>
					<Button>Submit</Button>
				</form>		
				{DataHandler}
			</div>
		);
	}
}

export default APICaller
