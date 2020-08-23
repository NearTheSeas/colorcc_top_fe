import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import Login from '@/components/Login';
import { Layout, Menu, Avatar, Modal, message } from 'antd';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  HomeOutlined,
  GroupOutlined,
  TagOutlined,
  // UserSwitchOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './DefaultLayout.less';
import avatar from '@/assets/avatar.jpg';
import { UserContext, actions } from '@/modules/UserContext';
import userApi from '@/modules/user';

const { Header, Footer, Content, Sider } = Layout;
const { confirm } = Modal;

interface Props {
  children: ReactElement[] | ReactElement;
}

function DefaultLayout({ children }: any): ReactElement {
  const { userState, dispatch } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { username, isLogin } = userState;
  let location = useLocation();
  let history = useHistory();

  let urls = location.pathname.split('/');

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const showLoginModal = () => {
    isLogin ? logOut() : setShowLogin(true);
  };

  const logOut = () => {
    confirm({
      title: '退出登录',
      content: '是否确定退出登录?',
      onOk: async () => {
        let {
          data: { message: msg },
        } = await userApi.logout();
        message.success(msg);
        history.push('/');
        dispatch({ type: actions.USER_LOOUT });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    if (!isLogin && urls.includes('admin')) {
      history.push('/');
    }
  }, [location]);

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
        <div className="user_info">
          <div onClick={showLoginModal}>
            <Avatar size={collapsed ? 50 : 140} src={avatar} />
          </div>
          <div className="connect">
            <div>{username}</div>
            <div>mail@126.com</div>
          </div>
        </div>
        <div className="collepsed-btn">
          {React.createElement(
            collapsed ? DoubleRightOutlined : DoubleLeftOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
        </div>
        <Menu mode="inline" selectedKeys={urls}>
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
                文章管理
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
        {/* <Footer>
          <div style={{ textAlign: 'center' }}>版权声明 ColoCC.TOP</div>
        </Footer> */}
      </Layout>
      <Login visible={showLogin} onCancel={() => setShowLogin(false)} />
    </Layout>
  );
}

export default DefaultLayout;
