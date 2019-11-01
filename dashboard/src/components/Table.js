import React from 'react';
import { Table, Divider, Tag } from 'antd';
import moment from 'moment';

function TableView({dataSource}) {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: date => moment(date, 'DD/MM/YYYY'),
		},
		{
			title: 'Type',
			key: 'type',
			dataIndex: 'type',
			render: tag => {
				let color = tag.length > 5 ? 'geekblue' : 'green';
				if (tag === 'error') {
					color = 'volcano';
				}
				return (
					<span>
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					</span>
				)
			},
		},
	];
	
	return <Table dataSource={dataSource} columns={columns} />;
}

export default TableView;