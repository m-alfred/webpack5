import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>I clicked {count} times </p>
      <button onClick={() => setCount(count + 1)} type='button'>
        Click me
      </button>
    </div>
  );
}

export default Example;
