import React, { Component } from  'react'
import { isValid } from '@/utils';
import { Button } from 'antd';
import picPikachu from '@/assets/pikachu.jpg';
import './index.less';

class Home extends Component{
  constructor(props) {
    super(props)

    this.state = {

    };
  }
  render() {
    return(
      <div className='the-home'>
        <h3>home12</h3>
        {
          'isValid:' + isValid(1)
        }
        <div >
          <Button onClick={() => this.props.history.push({pathname: '/detail'})}>to detail</Button>
        </div>
        <img src={picPikachu} alt=""/>
      </div>
    )
  }
}
export default Home