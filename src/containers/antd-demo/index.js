import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DynamicForm from './dynamic-form';
import DynamicNestForm from './dynamic-nest-form';

function Main() {
  return (
    <div>
      AntdDemo
    </div>
  );
}

function AntdDemo() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Main} />
      <Route path={`${path}/dynamic-form`} component={DynamicForm} />
      <Route path={`${path}/dynamic-nest-form`} component={DynamicNestForm} />
    </Switch>
  );
}

export default AntdDemo;
