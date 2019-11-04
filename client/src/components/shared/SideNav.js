import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideNav() {
	return(
		<Sider width={200} style={{ background: '#fff' }}>
			<Menu
				mode="inline"
				defaultSelectedKeys={['1']}
				style={{ height: '100%', borderRight: 0 }}
			>
				<Menu.Item key="sub1">
					<span>
						<Icon type="dashboard" />
						Dashboard
					</span>
				</Menu.Item>

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
			</Menu>
		</Sider>
	);
}

export default SideNav;