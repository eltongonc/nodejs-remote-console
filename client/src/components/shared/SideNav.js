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
				<SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="dashboard" />
                    Dashboard
						</span>
					}
				>
					<Menu.Item key="1">Logs</Menu.Item>
					<Menu.Item key="2">Errors</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
}

export default SideNav;