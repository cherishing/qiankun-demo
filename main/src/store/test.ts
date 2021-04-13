import { makeAutoObservable} from 'mobx'


class Test {
  constructor() {
    makeAutoObservable(this)
  }

  count = 3;

  setCount(v?: number) {
    if(v){
      this.count = v
    }else {
      this.count += 1
    }
  }
}

export default new Test()

