import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './Navbar';


class App extends Component {
  render() {
    return (
		<Router>
			<div>
				<Navbar/>
				<h1>This will be my Homepage!</h1>
			</div>
		</Router>
    );
  }
}

export default App;
