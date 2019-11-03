import React from 'react';
import "antd/dist/antd.css";
import { Layout } from 'antd';

import socket from '../socket';
import { openNotificationWithIcon } from '../shared/notifications';

import Header from '../shared/Header';
import SideNav from '../shared/SideNav';
import Dashboard from '../pages/Dashboard';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      errors: [],
    }
  }

  componentDidMount() {
    socket.on('new-connection', () => {
      console.log('Connected...');
      openNotificationWithIcon('info', 'New User Connected', 'Connected...');
    });

    socket.on('display-log', (message) => {
      const { logs } = this.state;

      logs.push(message);

      this.setState({ logs });
    });
  
    // Color it red
    socket.on('display-error', (message) => {
      const { errors } = this.state;

      errors.push(message);

      this.setState({ errors });
    });
  }
  
  render() {
    return (
      <Layout>
        <Header/>
        <Layout>
          <SideNav/>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Dashboard logs={this.state.logs} errors={this.state.errors}/>
          </Layout>
        </Layout>
    </Layout>
    );
  }
}

export default App;
