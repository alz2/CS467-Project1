import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './selectsearchstyle.css';
import MessageDrops from './MessageDrops.js';
import Select from 'react-select';
import SelectSearch from 'react-select-search'


// for rendering search conversation
function renderConversationOption(option) {
    return (<div>
                <p>{option.name}</p>
            </div>);
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: null,
            filteredData: null,
            conversationOptions: [],
            selectedConversations: null,
            metricOptions: [
                {
                    value: "positive",
                    label: "Postive"
                },
                {
                    value: "negative",
                    label: "Negative"
                },
                {
                    value: "neutral",
                    label: "Neutral"
                }
            ],
            msgFilterFns: {
                positive: (m) => {
                    return m.pos > m.neg && m.pos > m.neutral;
                },
                neutral: (m) => {
                    return m.neutral > m.pos && m.neutral > m.neg
                },
                negative: (m) => {
                    return m.neg > m.pos && m.neg > m.neutral
                },
                null: false
            },
            currentMetrics: []
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
                    name: c.name,
                    value: c.name
                };
            });

            // initialize state for check boxes
            let selectedConversations = {};
            for (let i = 0; i < conversationOptions.length; i++) {
                selectedConversations[conversationOptions[i].value] = false;
            }

            this.setState({
                allData: all_conversations,
                filteredData: [],
                conversationOptions: conversationOptions,
                selectedConversations: selectedConversations
            });

            console.log(this.state);
        });
    }

    filterAll() {
        console.log("FILTERALL");
        let filteredConversations = this.state.allData.filter(c => this.state.selectedConversations[c.name]);
        let metricFilters = this.state.currentMetrics.map(m => this.state.msgFilterFns[m]);
        let filteredMessages = filteredConversations.map(co => {
            return {
                name: co.name,
                messages: co.messages.filter(m => {
                    if (this.state.currentMetrics.length === 0) {
                        return false;
                    }
                    return metricFilters.some(f => f(m)); // returns true if at least one fn returns true
                })
            }
        });
        this.setState({filteredData: filteredMessages});
    }


    handleConversationChange = (ev) => {
        console.log(ev);
        let prevSelection = this.state.selectedConversations[ev.value];
        this.state.selectedConversations[ev.value] = !prevSelection; // update state
        this.filterAll();
    }

    handleMetricChange = (metrics) => {
        this.state.currentMetrics = metrics.map(m => m.value);
        this.filterAll();
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
                <div style={{
                    'display':'flex', 
                    'flex-direction':'row',
                    'width': '100%'
                }}>
                    <div style={{'width':'50%'}}>
                        <SelectSearch 
                            name="conversations"
                            options={this.state.conversationOptions} 
                            name="Conversations" 
                            placeholder="Search Conversations" 
                            onChange={this.handleConversationChange}
                            height={172}
                            renderOption={renderConversationOption}
                        />
                    </div>
                    <div style={{'width':'50%'}}>
                        <Select
                            isMulti
                            name="metrics"
                            onChange={this.handleMetricChange}
                            options={this.state.metricOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select Metrics" 
                        />
                    </div>
                </div>

        </div>
        );
    }
}

export default App;
//<fieldset>
//    <legend>Friends Checklist</legend>
//    <p>
//        { this.state.conversationOptions != null &&
//                this.state.conversationOptions.map(co => {
//                    return (
//                        <label className="container">{co.label}
//                            <input type="checkbox" value={co.value} onChange={this.handleFriendChange}/> 
//                            <span className="checkmark"></span>
//                        </label>
//                    );
//                })
//        }
//    </p>
//</fieldset>
