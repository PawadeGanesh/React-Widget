import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class BackNavigate extends Component {
	// state = {  }
	render() {
		return (
			<div>
				<span
					className='glyphicon glyphicon glyphicon-arrow-left'
					aria-hidden='true'
					onClick={() => this.props.history.push('/')}
					style={{ cursor: 'pointer' }}
				>
					<FontAwesomeIcon icon={faArrowLeft} style={{ color: 'blue' }} />
					<span className='ml-2' style={{ color: 'blue' }}>
						Back
					</span>
				</span>
			</div>
		);
	}
}

export default withRouter(BackNavigate);
