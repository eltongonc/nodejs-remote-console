import React from 'react';
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Icon, Col, Card, Row, Typography } from 'antd';

import './App.css';
import socket from './components/socket';
import { openNotificationWithIcon } from './components/notifications';
import TableView from './components/Table';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;



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
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Row gutter={16} style={{margin: '24px 0'}}>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: '0 8px',
                minHeight: 280,
              }}
            >
              <Title level={4}>Logs</Title>
              <TableView dataSource={this.state.logs.map((item) => {
                return {
                  name: item,
                  date: new Date().toString(),
                  type: 'log',
                };
              })}/>

              <br/>
              <Title level={4}>Errors</Title>
              <TableView dataSource={this.state.errors.map((item) => {
                return {
                  name: item,
                  date: new Date().toString(),
                  type: 'error',
                };
              })}/>
            </Content>
          </Layout>
        </Layout>
    </Layout>
    );
  }
}

export default App;
