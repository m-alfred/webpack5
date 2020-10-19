import React, { Component } from  'react'
import { isValid } from '@/utils';
class Home extends Component{
  constructor(props) {
    super(props)

    this.state = {

    };
  }
  render() {
    return(
      <div >
        home
        {
          'isValid:' + isValid(1)
        }
        <button onClick={() => this.props.history.push({pathname: '/detail'})}>to detail</button>
      </div>
    )
  }
}
export default Home