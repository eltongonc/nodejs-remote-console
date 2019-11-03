import React from 'react';
import { Layout, Menu } from 'antd';

const AntHeader = Layout.Header;

function Header() {
	return(
		<AntHeader className="header">
			<div className="logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				style={{ lineHeight: '64px' }}
			>
				<Menu.Item key="1">Logs</Menu.Item>
			</Menu>
		</AntHeader>
	);
}

export default Header;