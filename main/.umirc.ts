import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/subApp', microApp: 'subApp'}, //路由绑定方式
  ],
  qiankun: { // 构建起配置子应用
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'subApp',   // 子应用name
          entry: '//localhost:7000',  // html entry,
          props: {
              list: [1,2,3,4],
          }
        }
      ],
      sandbox: true,    //是否启用沙箱
      prefetch: 'all'   //是否启用预加载
    }
  }
});
