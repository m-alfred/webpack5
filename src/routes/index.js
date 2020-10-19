import React from 'react';
import {
  BrowserRouter, Route
} from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('@/containers/home'));
const Detail = loadable(() => import('@/containers/detail'));

const ROOT_PATH = '';

const routes = () => (
  <BrowserRouter basename={ROOT_PATH}>
    <Route path='/home' component={Home} />
    <Route path='/detail' component={Detail} />
  </BrowserRouter>
)

export default routes;