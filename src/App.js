import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import APICaller from "./components/api-caller.js"
import APIShowData from "./components/api-show-data"
import API from "./modules/apis"

class App extends Component {
  render() {
    return(
		<div>
			<APICaller use={APIShowData} secondary={["",API.Twitter]}/>
		</div>
	) ;
  }
}

export default App;
