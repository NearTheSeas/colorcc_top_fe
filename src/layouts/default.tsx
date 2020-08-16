import React, { ReactElement } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

interface Props {
  children: ReactElement;
}

export default function defaultLayout({ children }: Props): ReactElement {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
