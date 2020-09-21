import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import ContractBoard from './ContractBoard';
import { Link } from 'react-router-dom';
import SAPPriceBoard from './SAPPriceBoard';
import PriceBoard from './PriceBoard';
import ChartBoard from './ChartBoard';
// import AlertBox from '../components/layout/AlertBox';

class Dashboard extends Component {
	state = {
		count: 0,
		Data: [],
		data: [],
		Data1: [],
		rawMaterials: []
	};

	chckCount = newCount => {
		this.setState({ count: newCount.count });
	};

	checkData = newData => {
		this.setState({ Data: [...newData] });
	};

	checkData1 = newData1 => {
		this.setState({ Data1: [...newData1] });
	};

	checkdata = newdata => {
		this.setState({ data: [...newdata] });
	};

	checkRawMaterials = newMaterial => {
		this.setState({ rawMaterials: [...newMaterial] });
	};

	render() {
		return (
			<div>
				<div className='container'>
					<Row className='my-3'>
						<Col sm='6'>
							<div
								className='px-4 pt-3 shadow-sm'
								style={{
									backgroundColor: '#fff',
									borderRadius: 6,
									height: '300px'
								}}
							>
								<Row>
									<h6 style={{ marginLeft: '15px' }}>Recent Price Models</h6>
									<p
										style={{
											fontSize: '10px',
											marginLeft: 'auto',
											marginRight: '15px'
										}}
									>
										<b>Waiting for Approval</b>
										<span
											className='badge badge-danger ml-2'
											style={{ fontSize: '12px' }}
										>
											{this.state.count > 0 ? this.state.count : 0}
										</span>
									</p>
								</Row>
								<PriceBoard
									chckCount={this.chckCount}
									checkData={this.checkData}
								/>

								{this.state.Data.length >= 1 ? (
									<div>
										<hr className='m-0' />

										<p
											className='text-right p-1'
											style={{
												position: 'absolute',
												bottom: '0',
												right: '30px'
											}}
										>
											<Link to='/widget/price'>View All</Link>
										</p>
									</div>
								) : (
									<p
										className='text-right p-1'
										style={{
											position: 'absolute',
											bottom: '0',
											right: '30px'
										}}
									>
										<Link to='/createnew'>Create New</Link>
									</p>
								)}
							</div>
						</Col>
						<Col sm='6'>
							<div
								className='px-4 pt-3 shadow-sm'
								style={{
									backgroundColor: '#fff',
									borderRadius: 6,
									height: '300px'
								}}
							>
								<ChartBoard checkRawMaterials={this.checkRawMaterials} />
								{this.state.rawMaterials.length !== 0 && (
									<div>
										<p
											className='text-right p-1'
											style={{ position: 'relative' }}
										>
											<Link to='/widget/chart'>View All</Link>
										</p>
									</div>
								)}
							</div>
						</Col>
					</Row>
					<Row className='my-3'>
						<Col sm='6'>
							<div
								className='px-4 pt-3 shadow-sm'
								style={{
									backgroundColor: '#fff',
									borderRadius: 6,
									height: '300px'
								}}
							>
								<h6>SAP Price</h6>
								<SAPPriceBoard checkdata={this.checkdata} />
								{this.state.data.length >= 1 && (
									<div>
										<hr className='m-0' />
										<p
											className='text-right p-1'
											style={{
												position: 'absolute',
												bottom: '0',
												right: '30px'
											}}
										>
											<Link to='/widget/sap'>View All</Link>
										</p>
									</div>
								)}
							</div>
						</Col>
						<Col sm='6'>
							<div
								className='px-4 pt-3 shadow-sm'
								style={{
									backgroundColor: '#fff',
									borderRadius: 6,
									height: '300px'
								}}
							>
								<h6>Recent Contracts</h6>
								<ContractBoard checkData1={this.checkData1} />
								{this.state.Data1.length >= 1 && (
									<div>
										<hr className='m-0' />
										<p
											className='text-right p-1'
											style={{
												position: 'absolute',
												bottom: '0',
												right: '30px'
											}}
										>
											<Link to='/widget/contract'>View All</Link>
										</p>
									</div>
								)}
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Dashboard;
