import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';


import Router from '../shared/Router';

function App() {
	return (
		<BrowserRouter>
			<Router/>
		</BrowserRouter>
	);
}

export default App;
