import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorDetails() {
	return (
		<div style={{ width: '50%', marginLeft: '38%', marginTop: '8%' }}>
			<p>OOPS sorry we can`t find that page!</p>
			<p>Either something went wrong OR the page doesn`t exit anymore</p>

			<Link to='/'>
				<button type='button' className='bt btn-primary'>
					Home Page
				</button>
			</Link>
		</div>
	);
}
