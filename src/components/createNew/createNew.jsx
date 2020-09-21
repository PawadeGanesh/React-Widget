import React, { Fragment } from 'react';
import Form from '../layout/FormikForm';
import { Input, Button, Col, FormGroup, Label, Row } from 'reactstrap';
import { Field } from 'formik';
import BackNavigate from '../layout/BackNavigate';

class CreatePriceForm extends React.Component {
	render() {
		const initialValues = {
			supplierName: '',
			rawMaterialName: '',
			price: ''
		};
		return (
			<Fragment>
				<div style={{ marginLeft: '100px', marginTop: '20px' }}>
					<BackNavigate />
				</div>
				<div
					className='container'
					style={{
						paddingTop: '10px',
						paddingBottom: '10px',
						marginTop: '5%',
						paddingLeft: '20%'
					}}
				>
					<Form initialValues={initialValues} onSubmit={values => values}>
						<FormGroup row>
							<Label sm={3}>Supplier Name:</Label>
							<Col sm={5}>
								<Field
									name='supplierName'
									placeholder='supplier Name'
									component={({ field, form, ...props }) => (
										<Input type='text' {...field} {...props} />
									)}
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label sm={3}>Raw Material Name:</Label>
							<Col sm={5}>
								<Field
									name='rawMaterialName'
									placeholder='raw Material Name'
									component={({ field, form, ...props }) => (
										<Input type='text' {...field} {...props} />
									)}
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label sm={3}>Country:</Label>
							<Col sm={5}>
								<Field
									name='country'
									placeholder='country'
									component={({ field, form, ...props }) => (
										<Input type='text' {...field} {...props} />
									)}
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label sm={3}>Price($):</Label>
							<Col sm={5}>
								<Field
									name='price'
									placeholder='price($)'
									component={({ field, form, ...props }) => (
										<Input type='number' {...field} {...props} />
									)}
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label sm={3}>Date</Label>
							<Col sm={5}>
								<Field
									name='dateCreated'
									placeholder='date'
									component={({ field, form, ...props }) => (
										<Input type='date' {...field} {...props} />
									)}
								/>
							</Col>
						</FormGroup>
						<Row>
							<Col sm={{ offset: 4 }}>
								<Button color='success' type='submit'>
									Submit
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</Fragment>
		);
	}
}

export default CreatePriceForm;
