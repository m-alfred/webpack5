import React from 'react';
import Routes from './routes'
// antd 4 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。
import { DatePicker, Button, message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  return (
    <div className="App">Hello World
      <Button type="primary" onClick={() => message.info('welcome')}>欢迎</Button>
      <DatePicker />
      <Routes />
    </div>
  );
}

export default App;