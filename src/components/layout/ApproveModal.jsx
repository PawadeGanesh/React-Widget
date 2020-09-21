import React from 'react';
import { Button, ModalBody, ModalFooter, Modal } from 'reactstrap';

class StatusModal extends React.Component {
	render() {
		const {
			isModalOPen,
			isApprovedFail,
			isApproveSuccess,
			isRejectFail,
			isRejectSucces
		} = this.props;
		return (
			<React.Fragment>
				<Modal isOpen={isModalOPen}>
					<ModalBody>
						{isApprovedFail && (
							<p className='text-center'>
								<b>Approve Failed</b>
							</p>
						)}
						{isApproveSuccess && (
							<p className='text-center'>
								<b>Approved</b>
							</p>
						)}
						{isRejectFail && (
							<p className='text-center'>
								<b>Reject Failed</b>
							</p>
						)}
						{isRejectSucces && (
							<p className='text-center'>
								<b>Rejected</b>
							</p>
						)}
					</ModalBody>
					<ModalFooter style={{ border: 0 }}>
						<Button
							className='btn-theme pt-1 pb-1 btn-secondary'
							color='primary'
							type='button'
							onClick={this.props.closeModal}
						>
							Ok
						</Button>
					</ModalFooter>
				</Modal>
			</React.Fragment>
		);
	}
}

export default StatusModal;
