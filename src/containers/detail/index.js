import React, { Component } from 'react';
import { isValid } from '@/utils';
import './index.less';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Detail
        {`isValid:${isValid(null)}`}
      </div>
    );
  }
}
export default Detail;
