import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'reactstrap';
import AlertBox from '../components/layout/AlertBox';

class SAPPriceBoard extends Component {
	state = {
		isLoading: false,
		data: [],
		page: 1,
		pageSize: 4
	};

	getSAPList() {
		this.setState({ isLoading: true }, () => {
			axios
				.get(`${process.env.REACT_APP_SAPPRICEMODELBASEURI}`)
				.then(res => {
					const data = res.data.contracts;
					this.setState({ isLoading: false, data: res.data.contracts });
					this.props.checkdata(data);
				})
				.catch(error => {
					this.setState({ isLoading: false, error });
				});
		});
	}

	componentDidMount() {
		this.getSAPList();
	}

	columns() {
		return [
			{
				name: 'supplierName',
				label: 'Supplier'
			},
			{
				name: 'rawMaterialName',
				label: 'Materials'
			},
			{
				name: 'country',
				label: 'Country'
			},
			{
				name: 'price',
				label: 'Price(in $)'
			},
			{
				name: 'dateCreated',
				label: 'Created Date ',
				onRender: row =>
					row.dateCreated ? moment(row.dateCreated).format('L') : '---'
			}
		];
	}

	onPageChange(page) {
		this.setState({ page });
	}

	render() {
		const { data, page, pageSize, isLoading } = this.state;

		const pages = [];

		const results = [...data];
		while (results.length > 0) pages.push(results.splice(0, pageSize));

		const fields = this.columns();
		return (
			<div>
				{isLoading ? (
					<div
						className='d-flex justify-content-center'
						style={{ marginTop: '10%' }}
					>
						<span className='spinner-border'></span>
					</div>
				) : (
					<div className='table-responsive'>
						{data && data.length === 0 ? (
							<AlertBox />
						) : (
							<Table
								style={{
									fontSize: '10px'
								}}
							>
								<thead>
									<tr style={{ backgroundColor: '#d5ebf0' }}>
										{fields.map(field => (
											<th
												className='white text-center'
												onClick={() => this.sort(field.name)}
											>
												{field.label}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{pages[page - 1] &&
										pages[page - 1].map((eachRow, index) => {
											return (
												<tr key={index}>
													{fields.map(field => (
														<td className='white text-center'>
															{field.onRender
																? field.onRender(eachRow, index)
																: eachRow[field.name]}
														</td>
													))}
												</tr>
											);
										})}
								</tbody>
							</Table>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default SAPPriceBoard;
