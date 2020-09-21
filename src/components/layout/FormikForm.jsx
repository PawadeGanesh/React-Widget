import { Form as FormikForm, Formik } from 'formik';
import React from 'react';
import axios from 'axios';
// import moment from 'moment';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Form extends React.Component {
	static defaultProps = {
		initialValues: {}
	};

	onSubmit = values => {
		console.log(values);

		values.dateCreated = new Date(values.dateCreated);
		console.log('Val', values.dateCreated);
		// console.log(new Date(values.dateCreated));

		// console.log('KOK', values.dateCreated);
		axios
			.post(
				'https://jarvispricemgmt.azurewebsites.net/v1/pricemodels',
				values,
				{ headers: { 'Content-Type': 'application/json' } }
			)
			.then(response => this.props.history.push('/widget/price'))

			.catch(error => console.log(error));
	};

	render() {
		const { className, initialValues, children } = this.props;

		return (
			<div className={className}>
				<Formik initialValues={initialValues} onSubmit={this.onSubmit}>
					{() => <FormikForm autoComplete={'off'}>{children}</FormikForm>}
				</Formik>
			</div>
		);
	}
}

export default withRouter(Form);
