
# 使用教程

## 前言

主应用不限制，可接入qiankun或@umijs/plugin-qiankun

子应用使用@umijs/plugin-qiankun

###### 注意示例中：

main 主应用， 使用 @umijs/plugin-qiankun

main1主应用， 使用 qiankun

subApp 子应用，使用 @umijs/plugin-qiankun


## 子应用 @umijs/plugin-qiankun


### 1. 安装 @umijs/plugin-qiankun
 
```
npm i @umijs/plugin-qiankun -D
```

### 2.注册插件


```
 qiankun: { // 注册插件
    slave: {}
  }
```

### 3. 项目名称一定要配置
修改package.json的name

```
  "name": "subApp"
```

### 4. 固定子应用端口号，增加env文件



## 主应用 @umijs/plugin-qiankun


### 1. 安装 @umijs/plugin-qiankun


```
npm i @umijs/plugin-qiankun -D
```

### 2. .umirc.ts配置修改

 
```
  qiankun: { // 构建起配置子应用
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'subApp',   // 子应用name
          entry: '//localhost:7000',  // html entry,
        }
      sandbox: true,    //是否启用沙箱
      prefetch: 'all'   //是否启用预加载
    }
  }
```

### 3. 加载子应用


```
// 通过路由方式
// 1.配置路由
  routes: [
    { path: '/subApp', microApp: 'subApp'}, //路由绑定方式
  ]
// 2.跳转
  history.push({
      pathname: '/subApp'
})
  

//通过组件化方式
import {MicroApp} from 'umi';

<MicroApp name="subApp"    
          isFull={isFull}
          isFullChange={changeFull} />

```

### 4. 主子应用通信

#####  主应用打开方式

```
// 主应用 app.st，下发数据

export function useQiankunStateForSlave() {
  const [masterCount, setMasterCount] = useState(TestStore.count);
  TestStore.setCount(masterCount)
  return {
    masterCount,
    setMasterCount
  }
}

// 主应用修改通信数据
import { useModel} from 'umi';

const { masterCount, setMasterCount }=useModel('@@qiankunStateForSlave')

setMasterCount( 修改的值 )


```

#####  子应用接受数据
```
  const masterProps = useModel('@@qiankunStateFromMaster');
  
  masterProps.isFullChange()
  
  // 主应用下发的数据都包含在内  
  console.log(masterProps)
```




## 主应用 qiankun

### 1. 主应用安装 qiankun


```
npm i qiankun -S
```


### 主应用注册子组件



```
import {registerMicroApps,  start } from 'qiankun';



//注册
registerMicroApps([
    {
        name: 'subApp',  //子应用项目名
        entry: '//localhost:7000', // url
        container: '#subapp', //挂载的节点
        activeRule: '/',  
    }
]);

```

### 主应用加载子应用

```
//自动启动 
start({
    prefetch: 'all',
    strictStyleIsolation: true, //开启严格的样式隔离模式
})


//手动加载子应用
 this.microApp = loadMicroApp({
            name: 'subApp',
            entry: '//localhost:7000',
            container: '#root',
            props: {
                list: [7, 8, 9, 10]
            }
  })

```


### 主子应用通信

通过initGlobalState定义全局通信方法，调用onGlobalStateChange， setGlobalState等进行数据更改，具体查看main2



###### 参考链接
qiankun: https://qiankun.umijs.org/zh/api

umi-qiankun-plugin：https://umijs.org/zh-CN/plugins/plugin-qiankun


