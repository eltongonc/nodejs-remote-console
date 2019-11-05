import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Typography, Divider } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import fakeAuth from '../shared/fakeAuth';

const { Title } = Typography;
 
class Login extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err && values.username === 'admin' && values.password === 'admin') {
			fakeAuth.authenticate(() => {
				this.props.history.push('/');
			});
		  }
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="login-form">
				<div className="form">
					<Title className="form-title" level={4}>Login</Title>

					<Form onSubmit={this.handleSubmit} className="ant-card">
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
						Or <Link to="/register">register now!</Link>
						</Form.Item>
					</Form>

					{/**
						Temp disabled google login
						<Divider>Or</Divider>
	
						<a className="ant-btn ant-btn-danger" href="/login/google">Login with Google</a>
					 */}
				</div>
			</div>
		);
	}
}

Login.propTypes = {

};

export default Form.create({ name: 'normal_login' })(Login);