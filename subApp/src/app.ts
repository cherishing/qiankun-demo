import actions from './lib/actions';

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any){
    console.log('bootstrap:', props)
  },
  // 应用 render之后触发
  async mount(props: any){
    console.log('mount:', props)
    if (props) {
      // 注入 actions 实例
      actions.setActions(props);
    }
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('unmount:', props)
  }
};
