import * as d3 from 'd3/build/d3';

import eventDrops from '../src';
import '../src/style.css';
import { gravatar, humanizeDate } from './utils';

const repositories = require('./data2.json');

const numberCommitsContainer = document.getElementById('numberCommits');
const zoomStart = document.getElementById('zoomStart');
const zoomEnd = document.getElementById('zoomEnd');

const updateCommitsInformation = chart => {
    const filteredData = chart
        .filteredData()
        .reduce((total, repo) => total.concat(repo.data), []);

    numberCommitsContainer.textContent = filteredData.length;
    zoomStart.textContent = humanizeDate(chart.scale().domain()[0]);
    zoomEnd.textContent = humanizeDate(chart.scale().domain()[1]);
};

const tooltip = d3
    .select('body')
    .append('div')
    .classed('tooltip', true)
    .style('opacity', 0)
    .style('pointer-events', 'auto');

const chart = eventDrops({
    d3,
    zoom: {
        onZoomEnd: () => updateCommitsInformation(chart),
    },
    drop: {
        date: d => new Date(d.Date),
        onMouseOver: commit => {
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 1)
                .style('pointer-events', 'auto');

            tooltip
                .html(
                    `
                    <div class="commit">
                    <img class="avatar" src="${gravatar(
                        messages.name
                    )}" alt="${messages.name}" title="${
                        messages.name
                    }" />
                    <div class="content">
                        <h3 class="message">${messages.tag}</h3>
                        <p>
                            <a href="https://www.github.com/${
                                messages.name
                            }" class="author">${messages.name}</a>
                            on <span class="date">${humanizeDate(
                                new Date(commit.Date)
                            )}</span> -
                            <a class="sha" href="${
                                messages.tag
                            }">${messages.tag}</a>
                        </p>
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

const repositoriesData = repositories.map(repository => ({
    name: repository.name,
    data: repository.messages,
}));

d3
    .select('#eventdrops-demo')
    .data([repositoriesData])
    .call(chart);

updateCommitsInformation(chart);
