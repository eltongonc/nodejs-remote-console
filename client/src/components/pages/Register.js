import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../api';
import { openNotificationWithIcon } from '../shared/notifications';

const { Title } = Typography;
 
class Register extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
		};
	}

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Two passwords that you enter is inconsistent!');
		} else {
		  callback();
		}
	  };
	
	  validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
		  form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const data = {user: values};
	
			api.registerUser(data, (error, res) => {
				if (error) {
					openNotificationWithIcon('error', error.data.errors.message, '');
				} else {
					openNotificationWithIcon('success', res.message, '');
				}
			});
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="register-form">
				<div className="form">
					<Title className="form-title" level={4}>Register</Title>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item label="E-mail">
						{getFieldDecorator('email', {
							rules: [
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							},
							],
						})(<Input />)}
						</Form.Item>
						<Form.Item label="Password" hasFeedback>
							{getFieldDecorator('password', {
								rules: [
								{
									required: true,
									message: 'Please input your password!',
								},
								{
									validator: this.validateToNextPassword,
								},
								],
							})(<Input.Password />)}
						</Form.Item>
						<Form.Item label="Confirm Password" hasFeedback>
							{getFieldDecorator('confirm', {
								rules: [
								{
									required: true,
									message: 'Please confirm your password!',
								},
								{
									validator: this.compareToFirstPassword,
								},
								],
							})(<Input.Password onBlur={this.handleConfirmBlur} />)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('agreement', {
								valuePropName: 'checked',
								rules: [{required: true, message: 'Please check agree!',}]
							})(
								<Checkbox>
								I have read the <a href="">Terms and Conditions</a>
								</Checkbox>,
							)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Register
							</Button>
						</Form.Item>
					</Form>

					<Divider>Or</Divider>
					<Link className="ant-btn ant-btn-link" to="/login">Go to login page</Link>
				</div>
			</div>
		);
	}
}

Register.propTypes = {

};

export default Form.create({ name: 'regsiter' })(Register);