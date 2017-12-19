/* 
i expected to have more in this file but everything ended up happening a level lower
	this file calls the API, then allows you to pass a component to present the data.
	it also allows you to add extra functions to run the data through and will create 
	a display for each resulting data set.
	this may be better to do as multiple components but with where the api call ended up, this way only calls the api once

	the goal was to make it easy to add new ways to use the data, if i can write a function that takes the data as an input
	and calls an api, and returns new data, i can add it to the prop and it will display the result

*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import APICaller from "./components/api-caller.js"
import APIShowData from "./components/api-show-data"
import API from "./modules/apis"

async function wrap(val){
	val.show={key:"email",value:val.email}
	return {data:val}
}

class App extends Component {
  render() {
	//the wrap part used to be just inside the component, not sure which would be better
    return(
		<div>
			<APICaller use={APIShowData} secondary={[wrap,API.Twitter]}/>
		</div>
	) ;
  }
}

export default App;
