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

    render() {
        return (
            <div className="App">
            <h1>FRED</h1>
            <h6> Facebook Relationship Exploring Dots </h6>
            <br />
            <MessageDrops data={this.state.data}/>
            <h2>Metrics and Friends filter</h2>
            <select id="neighborhoods-select" name="neighborhoods" onchange="updateRestaurants()">
            <option value="Sentiment">Sentiment</option>
            <option value="Emotion">Emotion</option>
            </select>
            <label for="metric-select">Metric-select</label>
            <br />
            <br />
            <br />
            <select multiple id="cuisines-select" name="cuisines" onchange="updateRestaurants()">
            { this.state.conversation_options != null &&
                this.state.conversation_options.map(co => {
                    return <option value={co.value}>{co.label}</option>;
                })
            }
            </select>
            <label for="friends-select">Friends-select</label>
            <input type="submit" id="submit_1">
            </input>

            //</div>
            //<div className="App">
            //    <h1>FRED</h1>
            //    <h6> Facebook Relationship Exploring Dots </h6>
            //    <br />
            //    <MessageDrops data={this.state.filteredData}/>
            //    {this.state.conversation_options != null && 
            //        <Select
            //        //defaultValue={[colourOptions[2], colourOptions[3]]}
            //        isMulti
            //        name="colors"
            //        options={this.state.conversation_options}
            //        className="basic-multi-select"
            //        classNamePrefix="select"
            //        />
            //    }
            //</div>
                //<h2>Metrics and Friends filter</h2>
                //<select id="neighborhoods-select" name="neighborhoods" onchange="updateRestaurants()">
                //    <option value="Sentiment">Sentiment</option>
                //    <option value="Emotion">Emotion</option>
                //</select>
                //<label for="metric-select">Metric-select</label>
                //<br />
                //<br />
                //<br />
                //<select multiple id="cuisines-select" name="cuisines" onchange="updateRestaurants()">
                ////{ this.state.conversation_names != null &&
                ////    this.state.conversation_options.map(co => {
                ////        <option value={co.value}>{co.label}</option>
                ////    });
                ////}
                //</select>
                //<label for="friends-select">Friends-select</label>
                //<input type="submit" id="submit_1">
                //</input>

        );
    }
}

export default App;
