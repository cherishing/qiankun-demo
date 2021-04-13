function emptyAction() {
  console.warn('Current execute action is empty!');
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  setActions(actions: any) {
    this.actions = actions;
  }

  onGlobalStateChange(...args: any) {
    return this.actions.onGlobalStateChange(...args);
  }

  setGlobalState(...args: any) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();
export default actions;
