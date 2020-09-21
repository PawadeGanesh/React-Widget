import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import StatusModal from '../components/layout/ApproveModal';
import AlertBox from '../components/layout/AlertBox';

class PriceBoard extends Component {
	state = {
		isLoading: false,
		Data: [],
		page: 1,
		pageSize: 4,
		count: [],
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
			console.log(
				`process.env.REACT_APP_PriceModelBaseURI= ${process.env.REACT_APP_PRICEMODELBASEURI}`
			);

			console.log(
				`process.env.BUILD_BUILDNUMBER= ${process.env.BUILD_BUILDNUMBER}`
			);

			axios
				.get(`${process.env.REACT_APP_PRICEMODELBASEURI}`)
				.then(res => {
					const Data = res.data;
					this.setState({ isLoading: false, Data });
					this.props.checkData(res.data);
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
					const count = res.data;
					this.setState({ isLoading: false, count });
					this.props.chckCount(count);
					console.log(count);
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
				label: 'Created Date',
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
						<FontAwesomeIcon
							className='ml-2'
							icon={faTimesCircle}
							color='red'
							type='submit'
							onClick={() => this.handleReject(row.id)}
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
						/>
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
			<div>
				{Data && Data.length === 0 ? (
					<AlertBox />
				) : (
					<div className='table-responsive'>
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
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default PriceBoard;
