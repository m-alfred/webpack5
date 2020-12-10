import React, { useState } from 'react';
import Title from '@/components/Title';
import './index.less';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div className='the-home'>
      <Title text='hook component3352' />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)} type='button'>
        Click me1
      </button>
    </div>
  );
}

export default Example;
