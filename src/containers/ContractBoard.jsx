import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'reactstrap';
import AlertBox from '../components/layout/AlertBox';

class ContractBoard extends Component {
	state = {
		isLoading: false,
		Data1: [],
		page: 1,
		pageSize: 4
	};

	getContractList() {
		this.setState({ isLoading: true }, () => {
			console.log(
				`process.env.REACT_APP_ContractsBaseURI= ${process.env.REACT_APP_CONTRACTSBASEURI}`
			);

			console.log(process.env.REACT_APP_CONTRACTSBASEURI);
			console.log(process.env);

			axios
				.get(`${process.env.REACT_APP_CONTRACTSBASEURI}`)
				.then(res => {
					// console.log('PPP', res.data);
					const Data1 = res.data.contracts;
					this.setState({ isLoading: false, Data1 });
					this.props.checkData1(Data1);
					console.log(Data1);
				})
				.catch(error => {
					this.setState({ isLoading: true, error });
				});
		});
	}

	componentDidMount() {
		this.getContractList();
	}

	columns() {
		const { page, pageSize } = this.state;

		return [
			{
				name: 'id',
				label: 'Contract ID',
				onRender: (row, index) => index + 1 + (page - 1) * pageSize
			},
			{
				name: 'supplierName',
				label: 'Supplier'
			},
			{
				name: 'name',
				label: 'Materials'
			},
			{
				name: 'country',
				label: 'Country'
			},
			{
				name: 'contractDate',
				label: 'Contract Date',
				onRender: row =>
					row.contractDate ? moment(row.contractDate).format('L') : '---'
			}
		];
	}

	onPageChange(page) {
		this.setState({ page });
	}
	render() {
		const { Data1, page, pageSize, isLoading } = this.state;

		const pages = [];

		const results = [...Data1];
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
						{Data1 && Data1.length === 0 ? (
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

export default ContractBoard;
