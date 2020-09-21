import React, { Component } from 'react';
// import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
class DefaultWidget extends Component {
	render() {
		const { widget } = this.props;
		// this.props.widget
		return (
			<div className='widget bg-dark'>
				<h3
					style={{
						textAlign: 'center',
						paddingTop: '65px'
					}}
				>
					<Link style={{ color: 'white' }} to={`/widget/${widget.url}`}>
						{widget.name}
					</Link>
				</h3>
			</div>
		);
	}
}

export default DefaultWidget;
