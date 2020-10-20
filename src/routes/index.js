import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch
} from 'react-router-dom';
// import loadable from '@loadable/component';

const Home = lazy(() => import('@/containers/home'));
const Detail = lazy(() => import('@/containers/detail'));

// import Home from '@/containers/home';
// import Detail from '@/containers/detail';

const ROOT_PATH = '';

const routes = () => (
  <BrowserRouter basename={ROOT_PATH}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from='/' to='home' />
        <Route path='/home' component={Home} />
        <Route path='/detail' component={Detail} />
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default routes;