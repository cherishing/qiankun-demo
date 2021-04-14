import React, {useState, useEffect} from 'react';
import {loadMicroApp, initGlobalState} from 'qiankun';
import actions from "./lib/actions";
import './App.css';

function App() {
    const [count, setCount] = useState(3);
    const [isFull, setIsFull] = useState(false);
    const microApp = null;

    const initGlobal = () => {
        actions.setGlobalState({
            count: count,
            isFull: isFull,
            ignore: 'mmm'
        });
    };

    const handleGoToApp1 = () => {
        //手动启动
        this.microApp = loadMicroApp({
            name: 'subApp',
            entry: '//localhost:7000',
            container: '#root',
            props: {
                list: [7, 8, 9, 10]
            }
        })
    };

    const changeMainFull = () => {
        setIsFull(!isFull)
    };

    const changeMainMonk = () => {
        setCount(count + 1)
    };

    useEffect(() => {
        initGlobal()
    }, [])

    const changeMainGlobal = (v) => {
        actions.onGlobalStateChange((state, prev) => {
            // console.log('main:------------' , state, prev)
            if (v) {
                setCount(state.count);
                setIsFull(state.isFull);
            } else {
                if (state.count != prev.count) {
                    setCount(state.count);
                }
                if (state.isFull != state.isFull) {
                    setIsFull(state.isFull);
                }
            }
        }, v);
    };

    useEffect(() => {

        changeMainGlobal(true)

        return () => {
            microApp && microApp.unmount()
        }
    }, [])

    useEffect(() => {
        initGlobal();
    }, [
        count,
        isFull
    ])


    return (
        <div className="app2">
            <div className="app2-menu">
                <div className="app2-title">
                    我是非umi 主应用 ！！
                </div>
                <div>
                    <button onClick={handleGoToApp1}>点击到达子应用 subApp</button>
                    <div className="mt-10">
                        <span className="fs-18 red">{count}</span>
                        个和尚
                        <span className="fs-18 red">{isFull ? '有' : '无'}</span> 水喝
                        <div>
                            <button onClick={changeMainFull}>点击更改喝水状态</button>
                        </div>
                        <button className="mt-10" onClick={changeMainMonk}>点击增加和尚</button>
                    </div>
                </div>
            </div>
            <div className="app2-content" id="subapp">
            </div>
        </div>
    );
}

export default App;
