import React from 'react';
import { Layout, Col, Card, Row, Typography } from 'antd';
import PropTypes from 'prop-types';

import TableView from '../shared/Table';
import DashboardWrapper from './DashboardWrapper';

import socket from '../socket';
import { openNotificationWithIcon } from '../shared/notifications';

const { Content } = Layout;
const { Title } = Typography;

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			logs: [],
			errors: [],
		};
	}

	componentDidMount() {
		socket.on('new-connection', () => {
			openNotificationWithIcon('info', 'New User Connected', 'Connected...');
		});

		socket.on('display-log', (message) => {
			const { logs } = this.state;

			logs.push(message);

			this.setState({ logs });
		});
  
		// Color it red
		socket.on('display-error', (message) => {
			const { errors } = this.state;

			errors.push(message);

			this.setState({ errors });
		});
	}

	render() {
		return(
			<DashboardWrapper>
				<Row gutter={16} style={{margin: '24px 0'}}>
					<Col span={8}>
						<Card title="Logs" bordered={false}>
							<Title>0</Title>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Errors" bordered={false}>
							<Title>0</Title>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Projects" bordered={false}>
							<Title>0</Title>
						</Card>
					</Col>
				</Row>
				<Content
					style={{
						background: '#fff',
						padding: 24,
						margin: '0 8px',
						minHeight: 280,
					}}
				>
					<Title level={4}>Logs</Title>
					<TableView dataSource={this.state.logs.map((item) => {
						return {
							name: item,
							date: new Date().toString(),
							type: 'log',
						};
					})}/>
	
					<br/>
					<Title level={4}>Errors</Title>
					<TableView dataSource={this.state.errors.map((item) => {
						return {
							name: item,
							date: new Date().toString(),
							type: 'error',
						};
					})}/>
				</Content>
			</DashboardWrapper>
		);
	}
}

Dashboard.propTypes = {
	logs: PropTypes.array,
	errors: PropTypes.array,
};


export default Dashboard;