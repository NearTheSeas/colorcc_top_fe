import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '@/components/Login';
import { Layout, Menu, Avatar } from 'antd';
import {
  DoubleRightOutlined,
  CloseOutlined,
  HomeOutlined,
  GroupOutlined,
  TagOutlined,
  // UserSwitchOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './DefaultLayout.less';
import avatar from '@/assets/avatar.jpg';
import { UserContext } from '@/modules/UserContext';

const { Header, Footer, Content, Sider } = Layout;

interface Props {
  children: ReactElement[] | ReactElement;
}

function DefaultLayout({ children }: any): ReactElement {
  const { userState } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { username, isLogin } = userState;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const showLoginModal = () => {
    !isLogin && setShowLogin(true);
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
        <div className="user_info" onClick={showLoginModal}>
          <Avatar size={collapsed ? 50 : 140} src={avatar} />
          <div className="connect">
            <div>{username}</div>
            <div>联系方式</div>
          </div>
        </div>
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
          {isLogin && (
            <Menu.Item key="admin" icon={<FileTextOutlined />}>
              <NavLink to="/admin" activeClassName="selected">
                Atrticle
              </NavLink>
            </Menu.Item>
          )}
          {/* {isLogin && (
            <Menu.Item key="about" icon={<UserSwitchOutlined />}>
              <NavLink to="/about" activeClassName="selected">
                About
              </NavLink>
            </Menu.Item>
          )} */}
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
      <Login visible={showLogin} onCancel={() => setShowLogin(false)} />
    </Layout>
  );
}

export default DefaultLayout;
