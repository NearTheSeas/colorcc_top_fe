import React, { ReactElement, useContext } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserContext, actions } from '@/modules/UserContext';
// import styles from './index.module.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

export default function Login({ visible, onCancel }: Props): ReactElement {
  const { dispatch } = useContext(UserContext);
  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch({
      type: actions.USER_LOGIN,
      payload: { username: 'ColorCC', token: 'asdasdsd', isLogin: true },
    });
    onCancel();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal title="Welcome" visible={visible} onCancel={onCancel} footer={false}>
      <Form
        {...layout}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
