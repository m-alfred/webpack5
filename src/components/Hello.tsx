import * as React from 'react';
import { isValid } from '@/utils';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
class Hello extends React.Component<HelloProps, unknown> {
  render(): JSX.Element {
    return (
      <h1>
        {isValid(2)}
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}

export default Hello;
