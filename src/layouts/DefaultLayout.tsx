import React, { ReactElement, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DoubleRightOutlined,
  CloseOutlined,
  HomeOutlined,
  FileTextOutlined,
  GroupOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './defaultLayout.less';

const { Header, Footer, Content, Sider } = Layout;

interface Props {
  children: ReactElement[] | ReactElement;
}

export default function DefaultLayout({ children }: Props): ReactElement {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout
      className={`default-layout-wrapper ${collapsed ? 'hide-side-bar' : ''}`}
    >
      <Sider
        className="layout-left-slide"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <div className="collepsed-btn">
          {React.createElement(
            collapsed ? DoubleRightOutlined : CloseOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <NavLink to="/" activeClassName="selected">
              首页
            </NavLink>
          </Menu.Item>
          <Menu.Item key="article" icon={<FileTextOutlined />}>
            <NavLink to="/article" activeClassName="selected">
              Atrticle
            </NavLink>
          </Menu.Item>
          <Menu.Item key="category" icon={<GroupOutlined />}>
            <NavLink to="/category" activeClassName="selected">
              分类
            </NavLink>
          </Menu.Item>
          <Menu.Item key="tag" icon={<TagOutlined />}>
            <NavLink to="/tag" activeClassName="selected">
              标签
            </NavLink>
          </Menu.Item>
          <Menu.Item key="about" icon={<TagOutlined />}>
            <NavLink to="/about" activeClassName="selected">
              About
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          asd
        </Header>
        <Content className="site-layout-main-container">{children}</Content>
        <Footer>
          <div style={{ textAlign: 'center' }}>版权声明 ColoCC.TOP</div>
        </Footer>
      </Layout>
    </Layout>
  );
}
