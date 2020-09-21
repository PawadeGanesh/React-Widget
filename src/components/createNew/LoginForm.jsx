import React, { Component } from 'react';
// import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

class LoginForm extends Component {
	handleSignIn = (e) => {
		e.preventDefault();
		const username = this.refs.username.value;
		console.log(username);
		const password = this.refs.password.value;
		console.log(password);
		if (username && password) {
			localStorage.setItem('userName', username);
			this.props.history.push('/');
		}
	};

	render() {
		return (
			<div
				className='container'
				style={{
					paddingTop: '15px',
					marginTop: '5%',
					paddingLeft: '20%',
				}}
			>
				<div style={{ marginLeft: '10%' }}>
					<h1 style={{ marginLeft: '20%' }}>Login</h1>
					<form onSubmit={this.handleSignIn} style={{ marginTop: '15px' }}>
						<div className='form-group row'>
							<label className='col-form-label'>User Name: </label>
							<div class='col-sm-5'>
								<input
									type='text'
									className='form-control'
									ref='username'
									placeholder='Enter user name'
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-form-label'>Password: </label>
							<div class='col-sm-5' style={{ marginLeft: '12px' }}>
								<input
									type='password'
									className='form-control'
									ref='password'
									placeholder='Enter password'
								/>
							</div>
						</div>
						<div className='form-group row'>
							<div className='col-sm-10'>
								<button type='submit' className='btn btn-primary' style={{ marginLeft: '50%' }}>
									LogIn
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default LoginForm;
