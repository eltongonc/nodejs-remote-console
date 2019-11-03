import React from 'react';
import { Layout, Col, Card, Row, Typography } from 'antd';
import PropTypes from 'prop-types';

import TableView from '../shared/Table';

const { Content } = Layout;
const { Title } = Typography;

function Dashboard({logs, errors}) {
	return(
		<div>
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
				<TableView dataSource={logs.map((item) => {
					return {
						name: item,
						date: new Date().toString(),
						type: 'log',
					};
				})}/>

				<br/>
				<Title level={4}>Errors</Title>
				<TableView dataSource={errors.map((item) => {
					return {
						name: item,
						date: new Date().toString(),
						type: 'error',
					};
				})}/>
			</Content>
		</div>
	);
}

Dashboard.propTypes = {
	logs: PropTypes.array,
	errors: PropTypes.array,
};


export default Dashboard;