import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { Table, Row, Col } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import BackNavigate from '../layout/BackNavigate';
import AlertBox from '../layout/AlertBox';

class SAPPriceWidget extends Component {
	state = {
		isLoading: false,
		data: [],
		page: 1,
		pageSize: 5,
		sort: 'id',
		sortDir: 'desc',
	};

	getSAPList() {
		this.setState({ isLoading: true }, () => {
			axios
				.get(`${process.env.REACT_APP_SAPPRICEMODELBASEURI}`)
				.then((res) => {
					this.setState({ isLoading: false, data: res.data.contracts });
				})
				.catch((error) => {
					this.setState({ isLoading: false, error });
				});
		});
	}

	componentDidMount() {
		this.getSAPList();
		setInterval(this.getSAPList.bind(this), 30000);
	}

	columns() {
		return [
			{
				name: 'supplierName',
				label: 'Supplier',
			},
			{
				name: 'rawMaterialName',
				label: 'Materials',
			},
			{
				name: 'country',
				label: 'Country',
			},
			{
				name: 'price',
				label: 'Price($)',
			},
			{
				name: 'dateCreated',
				label: 'Date Created',
				onRender: (row) =>
					row.dateCreated ? moment(row.dateCreated).format('L') : '---',
			},
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
						SAP Price Widget List
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
							{data && data.length === 0 ? (
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
																	? field.onRender(eachRow)
																	: eachRow[field.name]}
															</td>
														))}
													</tr>
												);
											})}
									</tbody>
								</Table>
							)}
							{data.length >= 6 ? (
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
												pageCount={Math.ceil(data.length / pageSize)}
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

export default SAPPriceWidget;
