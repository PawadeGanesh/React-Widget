import React, { Component } from 'react';
import { Table, Col } from 'reactstrap';

class TableComp extends Component {
	render() {
		return (
			<Col sm={6} className='px-4 py-4'>
				<div className='widget bg-dark'>
					<div className='contailer' style={{ padding: '25px' }}>
						<Table bordered white>
							<thead>
								<tr>
									<th className='text-white text-center'>Contract Name</th>
									<th className='text-white text-center'>Supplier Name</th>
									<th className='text-white text-center'>Country</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='text-white text-center'>Contract1</td>
									<td className='text-white text-center'>Supplier1</td>
									<td className='text-white text-center'>USA</td>
								</tr>
								<tr>
									<td className='text-white text-center'>Contract2</td>
									<td className='text-white text-center'>Supplier2</td>
									<td className='text-white text-center'>INDIA</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
			</Col>
		);
	}
}

export default TableComp;
