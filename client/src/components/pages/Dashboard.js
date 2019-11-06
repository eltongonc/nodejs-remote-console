import React from 'react';
import { Layout, Col, Card, Row, Typography, Spin, Alert } from 'antd';
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
				this.setState({
					isLoading: false,
					issues,
					projects
				});
			});
		});
	}

	initSocket() {
		socket.on('new-connection', () => {
			openNotificationWithIcon('info', 'New User Connected', 'Connected...');
		});

		socket.on('display-log', (message) => {
			const { issues } = this.state;
			const issue = {
				project_id: this.state.projects[0]._id,
				type: 'log',
				name: message,
			};

			const data = { issue }; 

			issues.push(issue);

			this.setState({ issues });


			api.addIssue(data, (error, res) => {
				if (error) {
					openNotificationWithIcon('error', error.data.errors.message, '');
				} else {
					openNotificationWithIcon('success', res.message, '');
				}
			});
		});
	
		// Color it red
		socket.on('display-error', (message) => {
			const { issues } = this.state;

			const issue = {
				project_id: this.state.projects[0]._id,
				type: 'error',
				name: message,
			};

			const data = { issue }; 

			issues.push(issue);

			this.setState({ issues });

			api.addIssue(data, (error, res) => {
				if (error) {
					openNotificationWithIcon('error', error.data.errors.message, '');
				} else {
					openNotificationWithIcon('success', res.message, '');
				}
			});
		});
	
	}

	componentDidMount() {
		if (this.state.projects.length <=0) {
			// for now manualy add a project
			const data = {
				project: {
					name: 'Demo project',
					url: 'http://localhost:3001',
				}
			};
			api.addProject(data, (error, res) => {
				if (error) {
					openNotificationWithIcon('error', error.data.errors.message, '');
				} else {
					openNotificationWithIcon('success', res.message, '');
					this.initSocket();
				}
			});
		}
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

					<div className="banner">
						<Alert
							message="Usage"
							banner={true}
							closable
							description={
								<p>
									To monitor one of you projects please add the following tag to your html 
									<strong>{`<script id="remote-client" src="${window.location.origin}/client.js"></script>`}</strong>
								</p>
							}
							type="info"
						/>
					</div>
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