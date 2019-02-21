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
            let conversation_options = all_conversations.map(c => {
                return { 
                    value: c.name,
                    label: c.name
                };
            });
            console.log(conversation_options);
            this.setState({
                data: all_conversations,
                filteredData: all_conversations,
                conversation_options: conversation_options});
            console.log(this.state);
        });
    }

    handleFriendChange(ev) {
        console.log(ev.target.value);
        console.log(ev.target.checked);

    }

    render() {
        return (
            <div className="App">
            <h1>FRED</h1>
            <h6> Facebook Relationship Exploring Dots </h6>
            <br />
            <MessageDrops data={this.state.data}/>
            <fieldset>
            <legend>Friends Checklist</legend>
            <p>
            { this.state.conversation_options != null &&
                this.state.conversation_options.map(co => {
                    return (
                        <label className="container">{co.label}
                        <input type="checkbox" value={co.value} onChange={this.handleFriendChange}/> 
                        <span className="checkmark"></span>
                        </label>
                    );
                })
            }
            </p>
            </fieldset>
                <select id="neighborhoods-select">
                    <option value="Sentiment">Sentiment</option>
                    <option value="Emotion">Emotion</option>
                </select>
            </div>
        );
    }
}

export default App;
