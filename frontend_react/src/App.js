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
        //return (
        //    <div className="App">
        //    <h1>Event Drops Demo</h1>
        //    <div id="eventdrops-demo" style="width: 90%;"></div>
        //    <p className="infos">
        //    <span id="numberCommits"></span> commits 
        //    <span className="light">found between</span> <br />
        //    <span id="zoomStart"></span> 
        //    <span className="light">and</span> 
        //    <span id="zoomEnd"></span>
        //    </p>
        //    <script type="text/javascript" src="./data.json"></script>
        //    <footer>
        //    <p>
        //    Released under MIT license, courtesy of <a href="http://marmelab.com/">marmelab</a>
        //    and <a href="https://github.com/canalplus">Canal Plus</a>. More details on our
        //    <a href="https://github.com/marmelab/EventDrops">GitHub repository</a>.
        //    </p>
        //    </footer>
        //    </div>
        //);
    }
}

export default App;
