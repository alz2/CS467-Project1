import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageDrops from './MessageDrops.js';
import axios from 'axios'
import jsonData from "./data.json";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:jsonData
        }
        //axios.get('/:8080')
        //    .then(response => {
        //        console.log(response.data);
        //    });
        //this.grab_data();
    }

    componentDidMount() {
        console.log("FETCH");
        fetch("http://localhost:8080").then(res => {
            return res.json();
        }).then(json => {
            console.log(JSON.stringify(json));
        });
    }

    //grab_data = async() => {
    //    const api_call = await fetch('http://localhost:8080', {
    //        mode: "no-cors"
    //    });
    //    const data = await api_call.json();
    //    console.log(data);
    //}

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
