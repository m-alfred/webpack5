import React, { Component } from 'react';
import { isValid } from '@/utils';
import { Button } from 'antd';
import picPikachu from '@/assets/pikachu.jpg';
import icCopy from '@/assets/ic_copy.png';

import Title from '@/components/Title';
import { format } from '@/utils/date';
import Hello from '@/components/Hello';
import './index.less';

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    console.log('this.box.size:', this.box.clientWidth, this.box.clientHeight);

    await wait(2000);
    console.log('after 2000');
  }

  render() {
    return (
      <div className='the-home'>
        <Hello compiler='TypeScript' framework='React' />
        <Title text='home12' />
        {`isValid:${isValid(1)} at ${format(+new Date())}`}
        <div>
          <Button
            onClick={() => this.props.history.push({ pathname: '/detail' })}
          >
            to detail
          </Button>
        </div>
        <img src={picPikachu} alt='' />
        <img src={icCopy} alt='' />
        <div
          className='box-size'
          ref={(node) => {
            this.box = node;
          }}
        />
      </div>
    );
  }
}

export default Home;
