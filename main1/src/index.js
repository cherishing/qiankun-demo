import React from 'react';
import ReactDOM from 'react-dom';
import {registerMicroApps,  start } from 'qiankun';
import './index.css';
import App from './App';

//注册
registerMicroApps([
    {
        name: 'subApp',
        entry: '//localhost:7000',
        container: '#subapp', //挂载的节点
        activeRule: '/',
        props: {
            list: [7,8,9,10]
        }
    }
]);

//启动
start({
    prefetch: 'all',
    strictStyleIsolation: true, //开启严格的样式隔离模式
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

