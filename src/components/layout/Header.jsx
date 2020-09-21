import React, { Component } from 'react';
import { Navbar } from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
// import logo from '../../assets/img/logo.png';
import { Button } from 'reactstrap';

class Header extends Component {
	render() {
		const userName = localStorage.getItem('userName');
		const isLoginPage = window.location.pathname === '/login';
		if (userName && isLoginPage) {
			return <Redirect to='/' />;
		}

		if (!userName && !isLoginPage) {
			return <Redirect to='/login' />;
		}

		return (
			<div>
				<Navbar className='clearfix navbar' expand='md' style={{ zIndex: '999', display: 'block' }}>
					<div style={{ float: 'left' }}>
						{/* <span style={{ marginRight: 5 }}>
							<img alt='logo' className='logo-size' src={logo} />
						</span>{' '} */}
						<span onClick={() => this.props.history.push('/')}>
							<h5 style={{ color: 'blue', display: 'inline' }}>Gani's Workspace</h5>
						</span>
					</div>
					<div style={{ float: 'right' }}>
						{userName && <strong>Welcome, {userName}</strong>}
						{userName && (
							<Button
								style={{ marginLeft: '10px' }}
								color='danger'
								onClick={() => {
									localStorage.removeItem('userName');
									this.props.history.push('/login');
								}}
							>
								LogOut
							</Button>
						)}
					</div>
				</Navbar>
			</div>
		);
	}
}

export default withRouter(Header);
