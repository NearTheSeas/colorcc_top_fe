import React, { ReactElement } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
interface Props {
  children: ReactElement[] | ReactElement;
}

export default function Admin({ children }: Props): ReactElement {
  return (
    <Layout>
      <Header></Header>
      <Content>{children}</Content>
      <Footer>
        <div style={{ textAlign: 'center' }}>版权声明 ColoCC.TOP</div>
      </Footer>
    </Layout>
  );
}
