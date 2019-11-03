import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import Header from '../shared/Header';
import SideNav from '../shared/SideNav';

function DashboardWrapper({children}) {
	return (
		<Layout>
			<Header/>
			<Layout>
				<SideNav/>
				<Layout style={{ padding: '0 24px 24px' }}>
					{children}
				</Layout>
			</Layout>
		</Layout>
	);	
}


DashboardWrapper.propTypes = {
	children: PropTypes.any
};

export default DashboardWrapper;