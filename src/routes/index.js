import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// 指定chunkName
const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ '@/containers/home/index')
);
const Detail = lazy(() =>
  import(/* webpackChunkName: "detail" */ '@/containers/detail/index.hook')
);

const ROOT_PATH = '';

const routes = () => (
  <BrowserRouter basename={ROOT_PATH}>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Redirect exact from='/' to='home' />
          <Route path='/home' component={Home} />
          <Route path='/detail' component={Detail} />
        </Switch>
      </Suspense>
    </MyErrorBoundary>
  </BrowserRouter>
);

export default routes;
