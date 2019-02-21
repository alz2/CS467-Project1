import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageDrops from './MessageDrops.js';
import Select from 'react-select';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: null,
            filteredData: null,
            conversationOptions: null,
            checkedFriends: null
        }
    }

    componentDidMount() {
        console.log("FETCH");
        fetch("http://localhost:8080").then(res => {
            return res.json();
        }).then(json => {

            let all_conversations = json.result.conversations;
            let conversationOptions = all_conversations.map(c => {
                return { 
                    value: c.name,
                    label: c.name
                };
            });

            // initialize state for check boxes
            let checkedFriends = {};
            for (let i = 0; i < conversationOptions.length; i++) {
                checkedFriends[conversationOptions[i].label] = false;
            }

            this.setState({
                allData: all_conversations,
                filteredData: [],
                conversationOptions: conversationOptions,
                checkedFriends: checkedFriends
            });

            console.log(this.state);
        });
    }

    handleFriendChange = (ev) => {
        this.state.checkedFriends[ev.target.value] = ev.target.checked; // update state
        let newFriendData = this.state.allData.filter(c => this.state.checkedFriends[c.name]);
        this.setState({filteredData:newFriendData})
    }

    render() {
        return (
            <div className="App">
            <h1>FRED</h1>
            <h6> Facebook Relationship Exploring Dots </h6>
            <br />
            { this.state.allData != null &&
                <MessageDrops data={this.state.filteredData}/>
            }
            { this.state.allData == null &&
                <h1> Loading... </h1>
            }
            <fieldset>
            <legend>Friends Checklist</legend>
            <p>
            { this.state.conversationOptions != null &&
                this.state.conversationOptions.map(co => {
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
                <select id="neighborhoods-select" class="theme-pink">
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                    <option value="Negative">Neutral</option>
                </select>
            </div>
        );
    }
}

export default App;
