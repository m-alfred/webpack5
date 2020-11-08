import * as React from 'react';
import { isValid } from '@/utils';

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <h1>
        {isValid(2)}
        Hello from
        {' '}
        {this.props.compiler}
        {' '}
        and
        {' '}
        {this.props.framework}
        !
      </h1>
    );
  }
}

export default Hello;
