import React, { Component } from 'react';

class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <h1>
        { this.props.text}
      </h1>
    );
  }
}
export default Title;
