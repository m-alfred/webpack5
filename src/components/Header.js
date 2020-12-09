import React, { useState } from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

export default () => {
  const [username, setUsername] = useState('alfred');
  return (
    <Header className='app-header'>
      <span>我的名字叫 {username}</span>
      <Button type='primary' onClick={() => setUsername('jyh')}>
        修改名字
      </Button>
    </Header>
  );
};
