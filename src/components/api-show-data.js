import React, { Component } from "react"

//use this if you dont want to use to api
import testData from "../env/test"
import "./styles/api-display.css"

class APIShowData extends Component{
	//converts and object into an html table
	tableObject(obj){
		if (Array.isArray(obj)){
			let datarows=obj.map((val,i)=>{
				return <li key={i}>{this.tableObject(val)}</li>
			})
			return(<ol>{datarows}</ol>)
		}
		else if ((typeof(obj)==="object") && (obj!==null)){
			let datarows=Object.keys(obj).filter(key=>!(key==="show")).map(key=>{
					return(
						<tr key={key}>
							<td>{key}</td>
							<td>{this.tableObject(obj[key])}</td>
						</tr>
					)
			
				})
			return(<table><tbody>{datarows}</tbody></table>)
		} else if(obj!==null) {
			if((typeof(obj)==='string') && (obj.includes("http"))){
				return (<a href={obj}>{obj}</a>)
			}
		}	
		return obj
	}

	render(){
		let data=this.props.data
		let table=this.tableObject(this.props.data)
		return(
			<div className="container">
				<h2>{(data.show.key+": "+data.show.value)}</h2>
				{table}
			</div>
		);
	}
}

export default APIShowData
