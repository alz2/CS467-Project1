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
            checkedFriends: null,
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

    filterAll() {
        console.log("FILTERALL");
        let filteredConversations = this.state.allData.filter(c => this.state.checkedFriends[c.name]);
        let metricFilters = this.state.currentMetrics.map(m => this.state.msgFilterFns[m]);
        let filteredMessages = filteredConversations.map(co => {
            return {
                name: co.name,
                messages: co.messages.filter(m => {
                    if (this.state.currentMetrics.length == 0) {
                        return false;
                    }
                    return metricFilters.some(f => f(m));
                })
            }
        });
        this.setState({filteredData: filteredMessages});
    }


    handleFriendChange = (ev) => {
        this.state.checkedFriends[ev.target.value] = ev.target.checked; // update state
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
                <Select
                    isMulti
                    name="metrics"
                    onChange={this.handleMetricChange}
                    options={this.state.metricOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />

        </div>
        );
    }
}

export default App;
