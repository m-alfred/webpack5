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
      </div>
    )
  }
}
export default Home