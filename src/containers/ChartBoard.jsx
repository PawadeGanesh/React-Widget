import React, { Component, Fragment } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import moment from 'moment';
import AlertBox from '../components/layout/AlertBox';
// import AlertBox from '../components/layout/AlertBox';

class ChartBoard extends Component {
	state = {
		isLoading: false,
		rawMaterials: []
	};

	getChartList() {
		this.setState({ isLoading: true }, () => {
			axios
				.get(`${process.env.REACT_APP_CHARTSBASEURI}`)
				.then(res => {
					const results = res.data[0].priceTrend;
					console.log('chart', results);
					const rawMaterials = [
						...new Set(results.map(result => result.rawMaterialName))
					];
					this.props.checkRawMaterials(rawMaterials);

					console.log('aaa', rawMaterials.length);

					const data = results.map(result => ({
						date: d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ')(result.dateCreated),
						value: parseFloat(result.price),
						rawMaterial: result.rawMaterialName
					}));

					this.setState({
						isLoading: false,
						rawMaterials,
						results: data,
						selectedRawMaterial: rawMaterials[0]
					});

					this.renderLineChart();
				})
				.catch(error => {
					this.setState({ isLoading: true, error });
				});
		});
	}

	onChangeRawMaterial = e => {
		this.setState(
			{
				selectedRawMaterial: e.target.value
			},
			() => this.renderLineChart()
		);
	};

	renderLineChart() {
		document.getElementById('chart').innerHTML = '';
		const { results, selectedRawMaterial } = this.state;
		var margin = { top: 10, right: 10, bottom: 50, left: 50 },
			width = 400 - margin.left - margin.right,
			height = 220 - margin.top - margin.bottom;
		var dataFilter = results.filter(d => d.rawMaterial === selectedRawMaterial);

		console.log(selectedRawMaterial, dataFilter);

		var svg = d3
			.select('#chart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		var x = d3
			.scaleTime()
			.domain(
				d3.extent(dataFilter, function(d) {
					return d.date;
				})
			)
			.range([0, width]);
		svg
			.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x));

		var y = d3
			.scaleLinear()
			.domain([
				0,
				d3.max(dataFilter, function(d) {
					return +d.value;
				})
			])
			.range([height, 0]);

		svg.append('g').call(d3.axisLeft(y));

		svg
			.append('path')
			.datum(dataFilter)
			.attr('fill', '#69b3a2')
			.attr('fill-opacity', 0.3)
			.attr('stroke', 'none')
			.attr(
				'd',
				d3
					.area()
					.x(d => x(d.date))
					.y0(height)
					.y1(d => y(d.value))
			);

		svg
			.append('g')
			.append('path')
			.datum(dataFilter)
			.attr('fill', 'none')
			.attr('class', 'line')
			.attr('stroke', '#0eace6')
			.attr('stroke-width', 1.5)
			.attr(
				'd',
				d3
					.line()
					.x(d => x(d.date))
					.y(d => y(d.value))
			);

		var Tooltip = d3
			.select('#chart')
			.append('div')
			.style('opacity', 0)
			.attr('class', 'tooltip')
			.style('background-color', 'white')
			.style('border', 'solid')
			.style('border-width', '2px')
			.style('border-radius', '5px')
			.style('padding', '5px');

		var mouseover = function(d) {
			Tooltip.style('opacity', 1);
		};

		var mousemove = function(d) {
			Tooltip.html(
				'Date :' + moment(d.date).format('L') + ', Price :' + d.value
			)
				.style('left', d3.mouse(this)[0] + 90 + 'px')
				.style('top', d3.mouse(this)[1] + 130 + 'px');
		};

		var mouseleave = function(d) {
			Tooltip.style('opacity', 0);
		};

		svg
			.append('g')
			.selectAll('dot')
			.data(dataFilter)
			.enter()
			.append('circle')
			.attr('cx', d => x(d.date))
			.attr('cy', d => y(d.value))
			.attr('r', 3)
			.attr('fill', 'steelblue')
			.attr('class', 'dot')
			.attr('stroke', '#0eace6')
			.attr('stroke-width', 2)
			.attr('fill', 'white')
			.on('mouseover', mouseover)
			.on('mousemove', mousemove)
			.on('mouseleave', mouseleave);

		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('x', width)
			.attr('y', height + margin.top + 25)
			.style('font-size', '12px')
			.attr('fill', 'steelblue')
			.attr('x', margin.right + 180)
			.text('Date');

		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('transform', 'rotate(-90)')
			.attr('fill', 'steelblue')
			.style('font-size', '12px')
			.attr('y', margin.right - 40)
			.attr('x', margin.bottom - 100)
			.text('Prices (in $)');
	}

	componentDidMount() {
		this.getChartList();
	}

	render() {
		const { isLoading, rawMaterials } = this.state;
		return (
			<div style={{ height: '250px' }}>
				<h6 className='d-inline-block'>Material Price Trend</h6>

				{isLoading ? (
					<div
						className='d-flex justify-content-center'
						style={{ marginTop: '10%' }}
					>
						<span className='spinner-border'></span>
					</div>
				) : (
					<div className='responsive'>
						{rawMaterials.length === 0 ? (
							<AlertBox />
						) : (
							<Fragment>
								<select
									id='selectButton'
									className='float-right mr-5'
									onChange={this.onChangeRawMaterial}
								>
									{rawMaterials.map(rawMaterial => (
										<option value={rawMaterial}>{rawMaterial}</option>
									))}
								</select>

								<div id='chart'></div>
							</Fragment>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default ChartBoard;
