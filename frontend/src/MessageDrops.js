import React, { Component } from 'react'
import * as d3 from 'd3'
import {humanizeDate} from './utils.js'
import * as eventDrops from 'event-drops'


class MessageDrops extends Component {
    constructor(props) {
        super(props);
        this.createMessageDrops = this.createMessageDrops.bind(this);
        //console.log(props.data);
    }

    //updateCommitsInformation = chart => {
    //    const filteredData = chart
    //        .filteredData()
    //        .reduce((total, repo) => total.concat(repo.data), []);

    //    //numberCommitsContainer.textContent = filteredData.length;
    //    //zoomStart.textContent = humanizeDate(chart.scale().domain()[0]);
    //    //zoomEnd.textContent = humanizeDate(chart.scale().domain()[1]);
    //};

    componentDidMount() {
        this.createMessageDrops()
    }
    componentDidUpdate() {
        this.createMessageDrops()
    }

    scaleColor(color1, color2, val) {
        let gradient = d3.scalePow()
            .domain([0, 1])
            .range([color1, color2])
        return gradient(val);
    }


    createMessageDrops() {

        if (this.props.data == null) {
            return;
        }

        const node = this.node;

        const conversationData = this.props.data.map(c => ({
            name: c.name,
            data: c.messages,
        }));

        console.log("createMessageDrops");
        console.log(conversationData)

        const tooltip = d3
            .select('body')
            .append('div')
            .classed('tooltip', true)
            .style('opacity', 0)
            .style('pointer-events', 'auto');

        const chart = eventDrops({
            d3,
            line: { color: (_, index) => d3.schemeCategory10[index]},
            drop: {
                date: d => { 
                    return new Date(d.date)
                },

                onMouseOver: msg => {
                    tooltip
                        .transition()
                        .duration(200)
                        .style('opacity', 1)
                        .style('pointer-events', 'auto');

                    tooltip
                        .html(
                            `
                            <div class="commit">
                            <div class="content">
                                <p> <a class = "date">Date: <span class="date">${humanizeDate(
                                    new Date(msg.date))}</span> 
                                </p>
                                <p><a class = "msg"> ${msg.content}</p>
                                <p><a class = "msg"> Positive: ${msg.pos.toString().substr(0, 5)} </a></p>
                                
                                <p><a class = "msg"> Neutral: ${msg.neutral.toString().substr(0, 5)} </a> </p>
                                <p><a class = "msg"> Negative: ${msg.neg.toString().substr(0, 5)} </p>
                            </div>
                            `
                        )
                        .style('left', `${d3.event.pageX - 30}px`)
                        .style('top', `${d3.event.pageY + 20}px`);
                },
                

                onMouseOut: () => {
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0)
                        .style('pointer-events', 'none');
                },
                color: (d, i) => {
                    let pos = d.pos;
                    let neg = d.neg;
                    let neut = d.neutral;
                    if (pos > neg && pos > neut) {
                        return this.scaleColor("white", "rgba(0,255,0,0.5)", pos);
                    } else if (neg > pos && neg > neut) {
                        return this.scaleColor("white", "rgba(255,0,0,0.5)", neg);
                    } else {
                        return this.scaleColor("white", "rgba(0,0,0,0.2)", neut);
                    }
                }
            },
        });

        d3
            .select(node)
            .data([conversationData])
            .call(chart);
    }

    render() {
        console.log("render");
        console.log(this.props.data);
        if (this.props.data == null) {
            return (<h1> Loading... </h1>);
        }
        return (
            <div style={{width:"90%"}} ref={node => this.node = node}>
            </div>
        )
            //<svg ref={node => this.node = node} width="100%" height="100%"></svg>
    }
}

export default MessageDrops
