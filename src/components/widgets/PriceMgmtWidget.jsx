import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faTimesCircle,
	faCaretLeft,
	faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Table, Row, Col } from 'reactstrap';
import moment from 'moment';
import BackNavigate from '../layout/BackNavigate';
import ReactPaginate from 'react-paginate';
import StatusModal from '../layout/ApproveModal';
import AlertBox from '../layout/AlertBox';

class PriceWidget extends Component {
	state = {
		isLoading: false,
		page: 1,
		pageSize: 5,
		sort: 'id',
		sortDir: 'desc',
		Data: [],
		count: null,
		isApproveSuccess: false,
		isApprovedFail: false,
		isRejectSuccess: false,
		isRejectFail: false,
		isModalOpen: false
	};
	closeModal = () => {
		this.setState({
			isModalOpen: false
		});
	};
	getList() {
		this.setState({ isLoading: true }, () => {
			axios
				.get(`${process.env.REACT_APP_PRICEMODELBASEURI}`)
				.then(res => {
					const Data = res.data;
					this.setState({ isLoading: false, Data });
					console.log(Data);
				})
				.catch(error => {
					this.setState({ isLoading: true, error });
				});
		});
	}

	getCount() {
		this.setState({ isLoading: true }, () => {
			axios
				.get(`${process.env.REACT_APP_PRICEMODELBASEURI}/summary`)
				.then(res => {
					const countCheck = res.data.count;
					console.log('count', countCheck);

					this.setState({ isLoading: false, count: countCheck });
				})
				.catch(error => {
					this.setState({ isLoading: true, error });
				});
		});
	}

	componentDidMount() {
		this.getList();
		this.getCount();
	}

	handleApprove = id => {
		axios
			.post(`${process.env.REACT_APP_PRICEMODELBASEURI}/approve`, { id })
			.then(res => {
				this.setState({
					isApproveSuccess: true,
					isModalOpen: true
				});
				console.log('click', res);
				this.getList();
				this.getCount();
			})
			.catch(error => {
				this.setState({
					isApprovedFail: true,
					isModalOpen: true
				});
				console.log('Click', error);
			});
	};

	handleReject = id => {
		axios
			.post(`${process.env.REACT_APP_PRICEMODELBASEURI}/reject`, {
				id
			})
			.then(res => {
				this.setState({
					isRejectSuccess: true,
					isModalOpen: true
				});
				console.log('click', res);
				this.getList();
				this.getCount();
			})
			.catch(error => {
				this.setState({
					isRejectFail: true,
					isModalOpen: true
				});
				console.log('click', error);
			});
	};

	columns() {
		// const { page, pageSize } = this.state;

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
				label: 'Price($)'
			},
			{
				name: 'dateCreated',
				label: 'Date Created',
				onRender: row =>
					row.dateCreated ? moment(row.dateCreated).format('L') : '---'
			},
			{
				name: 'actions',
				label: 'Actions',
				onRender: row => (
					<div>
						<FontAwesomeIcon
							icon={faCheckCircle}
							color='green'
							type='submit'
							onClick={() => this.handleApprove(row.id)}
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
						/>
						<span className='ml-2'>Approve</span> |
						<FontAwesomeIcon
							className='ml-2'
							icon={faTimesCircle}
							color='red'
							type='submit'
							onClick={() => this.handleReject(row.id)}
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
						/>
						<span className='ml-2'>Reject</span>
					</div>
				)
			}
		];
	}

	onPageChange(page) {
		this.setState({ page });
	}

	render() {
		const {
			Data,
			count,
			page,
			pageSize,
			isLoading,
			isApproveSuccess,
			isModalOpen,
			isRejectFail,
			isRejectSuccess,
			isApprovedFail
		} = this.state;

		const pages = [];

		const results = [...Data];
		while (results.length > 0) pages.push(results.splice(0, pageSize));

		const fields = this.columns();
		return (
			<Fragment>
				<div className='container pt-2 pb-4'>
					<div style={{ float: 'left', marginTop: '10px' }}>
						<BackNavigate />
					</div>
					<div>
						<Button
							color='primary'
							style={{ float: 'right' }}
							onClick={() => {
								this.props.history.push('/createnew');
							}}
						>
							CreateNew
						</Button>
					</div>
				</div>

				<div
					className='shadow-sm table-responsive container'
					style={{
						backgroundColor: '#fff',
						borderRadius: 6,
						height: '420px',
						width: '100%',
						marginTop: '20px'
					}}
				>
					<Row>
						<h5 style={{ marginLeft: '10%', marginTop: '20px' }}>
							Price Widget List
						</h5>
						<p
							style={{
								fontSize: '15px',
								marginLeft: '550px',
								marginTop: '25px'
							}}
						>
							<b>Waiting for Approval</b>
							<span
								className='badge badge-danger ml-2'
								style={{ fontSize: '15px' }}
							>
								{count && count > 0 ? count : 0}
							</span>
						</p>
					</Row>

					{isLoading ? (
						<div
							className='d-flex justify-content-center'
							style={{ marginTop: '10%' }}
						>
							<span className='spinner-border'></span>
						</div>
					) : (
						<div>
							{isApproveSuccess ||
							isApprovedFail ||
							isRejectFail ||
							isRejectSuccess ? (
								<StatusModal
									isModalOPen={isModalOpen}
									closeModal={this.closeModal}
									isApprovedFail={isApprovedFail}
									isApproveSuccess={isApproveSuccess}
									isRejectFail={isRejectFail}
									isRejectSucces={isRejectSuccess}
								/>
							) : null}
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
											marginTop: '10px',
											fontSize: '15px'
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
											{/* {Data &&
									Data.map(Data => {
										return (
											<tr key={Data.id}>
												<td className='border-white text-center'>{Data.id}</td>
												<td className='border-white text-center'>
													{Data.supplierName}
												</td>
												<td className='border-white text-center'>
													{Data.rawMaterialName}
												</td>
												<td className='border-white text-center'>
													{Data.price}
												</td>
												<td className='border-white text-center'>
													{Data.country}
												</td>
												<td className='border-white text-center'>
													{Data.dateCreated &&
														moment(Data.dateCreated).format('YYYY MMM DD')}
												</td>
												<td className='border-white text-center'>
													<Button
														color='primary m-2'
														type='submit'
														onClick={() => this.handleApprove(Data.id)}
													>
														Approve
													</Button>
													<Button
														color='danger m-2'
														type='submit'
														onClick={() => this.handleReject(Data.id)}
													>
														Reject
													</Button>
												</td>
											</tr>
										);
									})} */}
										</tbody>
									</Table>
								)}
							</div>
							{Data.length >= 6 ? (
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
												previousClassName='page-arrow border-0'
												nextClassName='page-arrow border-0'
												previousLinkClassName='page-arrow border-0'
												nextLinkClassName='page-arrow border-0'
												breakClassName='page-item'
												breakLinkClassName='page-link border-0'
												breakLabel='...'
												pageCount={Math.ceil(Data.length / pageSize)}
												marginPagesDisplayed={2}
												pageRangeDisplayed={3}
												forcePage={page - 1}
												onPageChange={page =>
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

export default PriceWidget;
