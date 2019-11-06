import React from 'react';
import { Layout, Col, Card, Row, Typography, Spin } from 'antd';
import PropTypes from 'prop-types';

import TableView from '../shared/Table';
import PageWrapper from './PageWrapper';

import socket from '../socket';
import { openNotificationWithIcon } from '../shared/notifications';
import api from '../api';

const { Content } = Layout;
const { Title } = Typography;

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			logs: [],
			issues: [],
			projects: [],
			isLoading: true,
		};

		api.getIssues((err, issues) => {
			api.getProjects((err, projects) => {
				issues = issues || [];
				projects = projects || [];

				this.setState({
					isLoading: false,
					issues: issues,
					projects
				});
			});
		});

	}

	componentDidMount() {
		socket.on('new-connection', () => {
			openNotificationWithIcon('info', 'New User Connected', 'Connected...');
		});

		socket.on('display-log', (message) => {
			const { issues } = this.state;

			issues.push(message);

			this.setState({ issues });
		});
  
		// Color it red
		socket.on('display-error', (message) => {
			const { issues } = this.state;

			issues.push(message);

			this.setState({ issues });
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="loader">
					<Spin tip="Loading..." size="large"/>
				</div>
			);
		}

		const { projects, issues } = this.state;
		
		return(
			<PageWrapper>
				<Row gutter={16} style={{margin: '24px 0'}}>
					<Col span={8}>
						<Card title="Logs" bordered={false}>
							<Title>{issues.filter((item) => item.type === 'log').length}</Title>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Issues" bordered={false}>
							<Title>{issues.filter((item) => item.type === 'error').length}</Title>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Projects" bordered={false}>
							<Title>{projects.length}</Title>
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
					<Title level={4}>Issues</Title>
					<TableView dataSource={issues.map((item, i) => {
						return {
							name: item.name,
							date: item.date,
							type: item.type,
							key: i,
						};
					})}/>
				</Content>
			</PageWrapper>
		);
	}
}

Dashboard.propTypes = {
	logs: PropTypes.array,
	errors: PropTypes.array,
};


export default Dashboard;