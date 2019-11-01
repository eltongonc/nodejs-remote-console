import React from 'react';
import { Table, Divider, Tag } from 'antd';

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
		},
		{
			title: 'Type',
			key: 'type',
			dataIndex: 'type',
			render: tags => (
			  <span>
				{tags.map(tag => {
				  let color = tag.length > 5 ? 'geekblue' : 'green';
				  if (tag === 'error') {
					color = 'volcano';
				  }
				  return (
					<Tag color={color} key={tag}>
					  {tag.toUpperCase()}
					</Tag>
				  );
				})}
			  </span>
			),
		},
	];
	
	return <Table dataSource={dataSource} columns={columns} />;
}

export default TableView;