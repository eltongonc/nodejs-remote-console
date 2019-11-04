import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';

const AntHeader = Layout.Header;

function Header({history}) {
	const logOut = () => {
		localStorage.removeItem('authToken');
		
		history.push('/');
	};

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
				<Menu.Item key="2"><Button onClick={logOut}><Icon type="logout" /> Log out</Button></Menu.Item>
			</Menu>
		</AntHeader>
	);
}


export default withRouter(Header);