import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageDrops from './MessageDrops.js';
import Select from 'react-select';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            filteredData: null,
            conversation_options: null
        }
    }

    componentDidMount() {
        console.log("FETCH");
        fetch("http://localhost:8080").then(res => {
            return res.json();
        }).then(json => {
            let all_conversations = json.result.conversations;
            let conversation_names = all_conversations.map(c => {
                return { 
                    value: c.name,
                    label: c.name
                };
            });
            console.log(conversation_names);
            this.setState({
                data: all_conversations,
                filteredData: all_conversations,
                conversation_names: conversation_names});
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="App">
                <h1>FRED</h1>
                <h6> Facebook Relationship Exploring Dots </h6>
                <br></br>
                <MessageDrops data={this.state.filteredData}/>
            {this.state.conversation_names != null && 
                <Select
                //defaultValue={[colourOptions[2], colourOptions[3]]}
                isMulti
                name="colors"
                options={this.state.conversation_names}
                className="basic-multi-select"
                classNamePrefix="select"
                />
            }
            </div>
        );
    }
}

export default App;
