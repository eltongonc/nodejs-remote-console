import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Popconfirm } from 'antd';


import api from '../api';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideNav({history}) {
	const logOut = () => {

		api.logOut(() => {
			history.push('/');
		});
	};

	return(
		<Sider width={200} style={{ background: '#fff' }}>
			<div className="logo" />
			<Menu
				mode="inline"
				defaultSelectedKeys={['sub1']}
				style={{ height: '100%', borderRight: 0 }}
			>
				<Menu.Item key="sub1">
					<span>
						<Icon type="dashboard" />
						Dashboard
					</span>
				</Menu.Item>

				{/**
					Temp disabled menu items 
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="project" />
								Projects
							</span>
						}
					>
						<Menu.Item key="1">Project 1</Menu.Item>
						<Menu.Item key="2">Project 2</Menu.Item>
					</SubMenu>
	
					<Menu.Item key="sub3">
						<span>
							<Icon type="bug" />
							Issues
						</span>
					</Menu.Item>
	
					<SubMenu
						key="sub4"
						title={
							<span>
								<Icon type="setting" />
								Settings
							</span>
						}
					>
						<Menu.Item key="1">Setting 1</Menu.Item>
						<Menu.Item key="2">Setting 2</Menu.Item>
					</SubMenu>
				 */}

				<Menu.Item key="sub5">
					<Popconfirm
						title="Are you sure?"
						onConfirm={logOut}
						placement="bottom"
						icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
					>
						<a href="#">
							<span><Icon type="logout" /> Log out</span>
						</a>
					</Popconfirm>,
				</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default withRouter(SideNav);