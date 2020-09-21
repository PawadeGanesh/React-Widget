import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class AlertBox extends Component {
	render() {
		return (
			<div>
				<Alert color='primary text-center'>No Records Found</Alert>
			</div>
		);
	}
}

export default AlertBox;
