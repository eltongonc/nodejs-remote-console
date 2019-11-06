import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import Header from '../shared/Header';
import SideNav from '../shared/SideNav';

function PageWrapper({children}) {
	return (
		<Layout>
			<Layout>
				<SideNav/>
				<Layout style={{ padding: '0 24px 24px' }}>
					{children}
				</Layout>
			</Layout>
		</Layout>
	);	
}


PageWrapper.propTypes = {
	children: PropTypes.any
};

export default PageWrapper;