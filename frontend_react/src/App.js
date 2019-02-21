import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageDrops from './MessageDrops.js';
import jsonData from "./data.json";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        console.log("FETCH");
        fetch("http://localhost:8080").then(res => {
            return res.json();
        }).then(json => {
            this.setState({data: json.result.conversations});
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Event Drops Demo</h1>
                <MessageDrops data={this.state.data}/>
                

                
        <h2>Metrics and Friends filter</h2>
        <select id="neighborhoods-select" name="neighborhoods" onchange="updateRestaurants()">
          <option value="Sentiment">Sentiment</option>
          <option value="Emotion">Emotion</option>
        </select>
        <label for="metric-select">Metric-select</label>
        
                <br />
                <select multiple id="cuisines-select" name="cuisines" onchange="updateRestaurants()">
                <option value="Andrew_Zhang">Andrew Zhang</option>
                <option value="Lil_Pump">Lil Pump</option>
                <option value="Justin_Bieber">Justin Bieber</option>
                </select>
                <label for="friends-select">Friends-select</label>
                <input type="submit" id="submit_1">
                 </input>
                 
            </div>
        );
    }
}

export default App;
