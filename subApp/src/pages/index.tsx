import React , {useState, useEffect}from 'react';
import { useModel } from 'umi';
import actions from "@/lib/actions";

import  './index.less';

export default () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const [subCount, setSubCount] = useState(0);
  const [subIsFull, setSubIsFull ] = useState(false);
  let subList: number[] = [];

  // console.log('app 1:-----------------:',masterProps)

  const changeSubFull = () => {
    if(masterProps.isFullChange){
      masterProps.isFullChange()
    }
    actions.setGlobalState({
      isFull: !subIsFull
    });
  };

  const changeSubMonk = () => {
    if(masterProps.setMasterCount){
      masterProps.setMasterCount(masterProps.masterCount-1)
    }
    actions.setGlobalState({
      count: subCount+1
    });
  };

  const changeSubGlobal = (v?: boolean) => {
    actions.onGlobalStateChange((state: any, prev: any) => {
      // console.log('sub---------------:',state, prev);
      if(v){
        setSubCount(state.count);
        setSubIsFull(state.isFull)
      }else{
        if(state.count != prev.count){
          setSubCount(state.count);
        }
        if(state.isFull != prev.isFull) {
          setSubIsFull(state.isFull)
        }
      }
    }, v);
  };

  useEffect(() => {
    changeSubGlobal(true)
  }, [])

  return (
    <div className="app1">
      <h1 className="title">我是子应用 subApp ！！！</h1>
      <div> 来自主应用的
        <span className="red fw"> { masterProps.masterCount ||  subCount } </span>和尚
        <span className="red fw">{ masterProps.isFull || subIsFull  ? '有': '无'}</span> 水喝</div>
      <button onClick={changeSubFull}>更改主应用和尚喝水状态</button>
      <div className="mt-10">
        <button onClick={changeSubMonk}>更改主应用和尚</button>
      </div>

      <div className="mt-10">
        接收主应用中app配置中传递的props: {(masterProps?.list || subList)?.map((v: any) => v)}
      </div>
    </div>
  );
}
