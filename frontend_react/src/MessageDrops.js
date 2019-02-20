import React, { Component } from 'react'
import * as d3 from 'd3'
import humanizeDate from './utils.js'
import * as eventDrops from 'event-drops'


class MessageDrops extends Component {
    constructor(props) {
        super(props);
        this.createMessageDrops = this.createMessageDrops.bind(this);
        //console.log(props.data);
    }

    updateCommitsInformation = chart => {
        //const filteredData = chart
        //    .filteredData()
        //    .reduce((total, repo) => total.concat(repo.data), []);

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

        const node = this.node;

        const repositoriesData = this.props.data.map(repository => ({
            name: repository.name,
            data: repository.commits,
        }));

        console.log("createMessageDrops");
        console.log(repositoriesData)

        const chart = eventDrops({
            d3,
            zoom: {
                onZoomEnd: () => this.updateCommitsInformation(chart),
            },
            drop: {
                date: d => new Date(d.date),
                //onMouseOver: commit => {
                //    tooltip
                //        .transition()
                //        .duration(200)
                //        .style('opacity', 1)
                //        .style('pointer-events', 'auto');

                //    tooltip
                //        .html(
                //            `
                //    <div class="commit">
                //    <img class="avatar" src="${gravatar(
                //        commit.author.email
                //    )}" alt="${commit.author.name}" title="${
                //        commit.author.name
                //    }" />
                //    <div class="content">
                //        <h3 class="message">${commit.message}</h3>
                //        <p>
                //            <a href="https://www.github.com/${
                //                commit.author.name
                //            }" class="author">${commit.author.name}</a>
                //            on <span class="date">${humanizeDate(
                //                new Date(commit.date)
                //            )}</span> -
                //            <a class="sha" href="${
                //                commit.sha
                //            }">${commit.sha.substr(0, 10)}</a>
                //        </p>
                //    </div>
                //`
                //        )
                //        .style('left', `${d3.event.pageX - 30}px`)
                //        .style('top', `${d3.event.pageY + 20}px`);
                //},
                //onMouseOut: () => {
                //    tooltip
                //        .transition()
                //        .duration(500)
                //        .style('opacity', 0)
                //        .style('pointer-events', 'none');
                //},
            },
        });
        d3
            .select(node)
            .data([repositoriesData])
            .call(chart);
    }

    render() {
        console.log("render");
        console.log(this.props.data);
        if (this.props.data == null) {
            return (<h1> Loading </h1>);
        }
        return <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}>
            </svg>
    }
}

export default MessageDrops
