import React, {useState} from 'react';
import { useObserver } from 'mobx-react'
import {MicroApp, history, useModel} from 'umi';
import {Button} from 'antd-mobile';
import {TestStore} from '@/store'

import './index.less';

export default () => {
  const { masterCount, setMasterCount } = useModel('@@qiankunStateForSlave')
  const [isFull, setIsFull] = useState(false);

  const changeFull = () => {
    setIsFull(!isFull)
  };

  const changeMonk = () => {
    TestStore.setCount()
    setMasterCount(TestStore.count)
  }

  const handleGoToApp1 = () => {
    history.push({
      pathname: '/subApp'
    })
  };


  return useObserver(() => (
    <div className="wrap">
      <div className="menu">
        <div className="title">我是主应用</div>
        {/*组件方式*/}
        <Button onClick={handleGoToApp1}>点击到达子应用 subApp </Button>
        <div className="mt-10">
          <span className="fs-18 red">{masterCount}</span>
          个和尚
          <span className="fs-18 red">{isFull ? '有' : '无'}</span> 水喝
          <div>
            <button onClick={changeFull}>点击更改喝水状态</button>
          </div>
          <button className="mt-10" onClick={changeMonk}>点击增加和尚</button>
        </div>
      </div>
      <div className="content">
        <div className="sub1">
          {/*组件方式*/}
          <MicroApp name="subApp" isFull={isFull} isFullChange={changeFull}/>
        </div>
      </div>
    </div>))
}
