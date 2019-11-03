import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;
 
class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		});
	};

	render() {
		// const { getFieldDecorator } = this.props.form;

		return (
			<div className="login-form">
				<div className="form">
					<Title className="form-title" level={4}>Login</Title>
					{/**
						<Form onSubmit={this.handleSubmit} className="form ant-card">
							<Form.Item>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please input your username!' }],
							})(
								<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
								/>,
							)}
							</Form.Item>
							<Form.Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
							})(
								<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
								/>,
							)}
							</Form.Item>
							<Form.Item>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(<Checkbox>Remember me</Checkbox>)}
							<a className="login-form-forgot" href="">
								Forgot password
							</a>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
							Or <a href="">register now!</a>
							</Form.Item>
						</Form>
					*/}

					<a className="ant-btn ant-btn-danger" href="/login/google">Login with Google</a>
					<a className="ant-btn ant-btn-primary" href="/login/facebook">Login with Facebook</a>
				</div>
			</div>
		);
	}
}

Login.propTypes = {

};

export default Form.create({ name: 'normal_login' })(Login);