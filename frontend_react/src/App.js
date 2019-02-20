import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageDrops from './MessageDrops.js';
import axios from 'axios'
import jsonData from "./data.json";


class App extends Component {
    
    state = {data:jsonData}
    
    constructor(props) {
        super(props);
        //axios.get('localhost:8080')
        //    .then(response => {
        //        console.log(response.data);
        //        this.setState({data: response.data.name})
        //    });
    }

    render() {
        return (
          <div className="App">
            <h1>Event Drops Demo</h1>
            <MessageDrops data={this.state.data} size={[1000,500]}/>
          </div>
        );
    }
}

export default App;
