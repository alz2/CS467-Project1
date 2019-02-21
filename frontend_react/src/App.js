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
		<fieldset>
		<legend>Friends Checklist</legend>
		<p>
		<label class="container">Andrew Zhang
		<input type="checkbox" onclick='filter(this);'/>
		<span class="checkmark"></span>
		</label>
		<label class="container">Lil Pump
		<input type="checkbox" onclick='filter(this);'/>
		<span class="checkmark"></span>
		</label>
		<label class="container">Justin Bieber
		<input type="checkbox" onclick='filter(this);'/>
		<span class="checkmark"></span>
		</label>
		</p>
		</fieldset>

		<script>
		function filter()
		</script>
	    </div>
	);
    }
}

export default App;
