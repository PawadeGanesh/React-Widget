import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Table, Row, Col } from 'reactstrap';
import moment from 'moment';
import BackNavigate from '../layout/BackNavigate';
import ReactPaginate from 'react-paginate';
import AlertBox from '../layout/AlertBox';

class ContractWidget extends Component {
	state = {
		isLoading: false,
		Data: [],
		page: 1,
		pageSize: 5,
		sort: 'id',
		sortDir: 'desc',
	};

	getContractList() {
		this.setState({ isLoading: true }, () => {
			console.log('process.env.REACT_APP_ContractsBaseURI= ');
			console.log(process.env.REACT_APP_CONTRACTSBASEURI);
			axios
				.get(`${process.env.REACT_APP_CONTRACTSBASEURI}`)
				.then((res) => {
					// console.log('PPP', res.data);
					const Data = res.data.contracts;
					this.setState({ isLoading: false, Data });
					console.log(Data);
				})
				.catch((error) => {
					this.setState({ isLoading: false, error });
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
				onRender: (row, index) => index + 1 + (page - 1) * pageSize,
			},
			{
				name: 'supplierName',
				label: 'Supplier',
			},
			{
				name: 'name',
				label: 'Materials',
			},
			{
				name: 'country',
				label: 'Country',
			},
			{
				name: 'contractDate',
				label: 'Contract Date',
				onRender: (row) =>
					row.contractDate ? moment(row.contractDate).format('L') : '---',
			},
		];
	}

	onPageChange(page) {
		this.setState({ page });
	}

	render() {
		const { Data, page, pageSize, isLoading } = this.state;

		const pages = [];

		const results = [...Data];
		console.log(results);
		while (results.length > 0) pages.push(results.splice(0, pageSize));

		const fields = this.columns();
		return (
			<Fragment>
				<div style={{ marginLeft: '100px', marginTop: '20px' }}>
					<BackNavigate />
				</div>

				<div
					className='shadow-sm table-responsive container'
					style={{
						backgroundColor: '#fff',
						borderRadius: 6,
						height: '420px',
						width: '100%',
						marginTop: '20px',
					}}
				>
					<h5 style={{ marginLeft: '10%', marginTop: '20px' }}>
						Contract Widget List
					</h5>
					{isLoading ? (
						<div
							className='d-flex justify-content-center'
							style={{ marginTop: '10%' }}
						>
							<span className='spinner-border'></span>
						</div>
					) : (
						<div>
							{Data && Data.length === 0 ? (
								<div style={{ marginTop: '100px' }}>
									<AlertBox />
								</div>
							) : (
								<Table
									className='widget-row'
									style={{
										width: '80%',
										marginLeft: '10%',
										marginTop: '20px',
										fontSize: '15px',
									}}
								>
									<thead>
										<tr style={{ backgroundColor: '#d5ebf0' }}>
											{fields.map((field) => (
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
														{fields.map((field) => (
															<td className='white text-center'>
																{field.onRender
																	? field.onRender(eachRow, index)
																	: eachRow[field.name]}
															</td>
														))}
													</tr>
												);
											})}
										{/* {Data &&
									Data.map((eachRow, index) => {
										return (
											<tr key={index}>
												<td className='border-white text-center'>
													{index + 1}
												</td>
												<td className='border-white text-center'>
													{eachRow.name}
												</td>
												<td className='border-white text-center'>
													{eachRow.supplierName}
												</td>
												<td className='border-white text-center'>
													{eachRow.buyerName}
												</td>
												<td className='border-white text-center'>
													{moment(eachRow.contractDate).format('YYYY MMM DD')}
												</td>
												<td className='border-white text-center'>
													{eachRow.country}
												</td>
											</tr>
										);
									})} */}
									</tbody>
								</Table>
							)}
							{Data && Data.length >= 6 ? (
								<div>
									<Row className='justify-content-center align-items-center m-0'>
										<Col sm={{ size: 'auto' }} className='pl-0'>
											<ReactPaginate
												previousLabel={
													<span className='page-link border-0'>
														<FontAwesomeIcon icon={faCaretLeft} />
													</span>
												}
												nextLabel={
													<span className='page-link border-0'>
														<FontAwesomeIcon icon={faCaretRight} />
													</span>
												}
												previousClassName='page-arrow'
												nextClassName='page-arrow'
												previousLinkClassName='page-arrow border-0'
												nextLinkClassName='page-arrow border-0'
												breakClassName='page-item'
												breakLinkClassName='page-link border-0'
												breakLabel='...'
												pageCount={Math.ceil(Data.length / pageSize)}
												marginPagesDisplayed={2}
												pageRangeDisplayed={3}
												forcePage={page - 1}
												onPageChange={(page) =>
													this.onPageChange(page.selected + 1)
												}
												containerClassName='pagination mb-0 justify-content-center'
												activeClassName='font-weight-bold activePage'
												pageClassName='page-item'
												pageLinkClassName='page-link border-0'
											/>
										</Col>
									</Row>
								</div>
							) : null}
						</div>
					)}
				</div>
			</Fragment>
		);
	}
}

export default ContractWidget;
