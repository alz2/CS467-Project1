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

    updateCommitsInformation = chart => {
        const filteredData = chart
            .filteredData()
            .reduce((total, repo) => total.concat(repo.data), []);

        //numberCommitsContainer.textContent = filteredData.length;
        //zoomStart.textContent = humanizeDate(chart.scale().domain()[0]);
        //zoomEnd.textContent = humanizeDate(chart.scale().domain()[1]);
    };

    componentDidMount() {
        this.createMessageDrops()
    }
    componentDidUpdate() {
        this.createMessageDrops()
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
            zoom: {
                onZoomEnd: () => this.updateCommitsInformation(chart),
            },
            drop: {
                date: d => { 
                    return new Date(d.Date)
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
                                <p> Pos: ${msg.pos} </p>
                                <p> Neutral: ${msg.neutral} </p>
                                <p> Neg: ${msg.neg} </p>
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
            <div style={{width:"90%"}}>
            <p className="infos">Info</p>
            <svg ref={node => this.node = node} width="auto" height="auto"></svg>
            </div>
        )
    }
}

export default MessageDrops
