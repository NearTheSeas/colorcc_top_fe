import React, { ReactElement, useContext } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { UserContext, actions } from '@/modules/UserContext';
import userApi from '@/modules/user';
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
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    let {
      data: { username, message: msg },
    } = await userApi.login(values);
    if (username) {
      message.success(msg);
      form.resetFields();
      dispatch({
        type: actions.USER_LOGIN,
        payload: { username: username },
      });
      onCancel();
    } else {
      message.error(msg);
    }
  };

  return (
    <Modal title="Welcome" visible={visible} onCancel={onCancel} footer={false}>
      <Form
        {...layout}
        name="login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoComplete="off" />
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
