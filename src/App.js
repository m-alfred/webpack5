// import 'react-hot-loader' in your main file (before React)
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Button, message } from 'antd';
import Routes from './routes';
// antd 4 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  async function handleClick() {
    message.info('welcome');
    const module = await import('@/utils/print');
    console.log('module', module);

    const print = module.default;
    print();
  }
  return (
    <div className="App">
      Hello World1
      <Button type="primary" onClick={() => handleClick()}>欢迎1</Button>
      <Routes />
    </div>
  );
}

export default hot(App);
