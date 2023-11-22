## React-Dashboard

**You can see all demo in this project. We think code is the best doc.**

### Quick start

* 拷贝 Containers 下类似模块，改文件名称
* 更改 Containers/index 里 connect 需要的state
* 更改 Containers/action命名空间
* 在 Containers/state 写与页面对应的数据结构 
* 在 Containers/Components/*.pcss 写与组件对应的样式 
* 在 Containers/task.js 写业务逻辑
* 在 Containers/ajax.js 写ajax方法 做数据映射,校验
* 在 redux/reducers 添加 reducer
* 在 Router.js 引入 Containers/index.js 
* 在 config.js 增加新的路由信息
* 在 App/ajax 增加路由权限key
* 在 App/route 增加路由变化的初始化页面的actionCreator

### 开发模式 

一个模块就是一个文件夹,储存该模块需要的所有资源: 

* action.js | create action.type (naming action)
* ajax.js | 处理api server 与 redux state 数据的映射,校验
* index.jsx | 模块的入口, 经过 redux connect 的 react 组件
* reduce.js | redux reduce, 根据 dispatch 过来的 action 返回新的 state
* state.js | 模块的数据中心, 通常与页面状态一一对应, 建议单层数据结构，按组件名命名key
* task.js | 处理同步,异步的业务逻辑, 建议将所有的业务逻辑集中于这里
* Components | 存放子组件, 样式, 资源, 图片等等

参考 Demo component `app/Containers/Demo`

```
state => reduce => Containers => Components => CallBack => Containers event => 

dispatch(task) => dispatch(ajax) => dispatch(upstate) =>newState  
```

不一定所有数据过state，如不需要重复利用的：删除userId、更新状态status、表格数据tableDate、新增数据
使用同一组件，不同状态时候需要，例如表单查看之后编辑保存的

所有的业务逻辑集中在 task.js

```
==== task.js ====
const edit = (value) =>
  async (dispatch, getState) => {
    const id = getState().packages.packageId

    dispatch(updateState({
      formSaveLoading: true
    }))
    await ajaxEditDetail(dispatch)
    await ajaxEdit(dispatch, {...value,id})
      .then(() => {
        message.success('编辑成功')
        dispatch(updateState({}))
      })
      .catch((err) => console.error(err))

    dispatch(updateState({formSaveLoading: false}))
    console.log('done!')
  }
```
### 命名规范

* 一般函数使用驼峰法
* action name, components, 使用首字母大写的驼峰法
* state 使用 `compoent + status`

### [Functional and Class Components][react-component]

* 当需要缓存一些中间值而不需要与其它组件共享状态时,使用 class components
* 当需要用到生命周期时,使用 class components 


### notice 

* 组件文件后缀名写上.jsx  
* react-router exact
  When true, will only match if the path matches the location.pathname exactly.
* process.env.NODE_ENV === 'production'  
 Keep in mind that import() path cannot be fully dynamic (e.g., import(Math.random())). 
 Rather either completely static (e.g., import('./locale/de.json')) 
 or partially static (e.g., import('./locale/' + language + '.json')). 
* promise error
 use `Promise.catch((error)=>{})` 
* state结构：一层数据结构，按组件名分
* 命名尽可能公共化

### API

### 基础模块

- [x] Login
  - [x] login/logout
  - [x] reset password
  - [ ] forgot password
  - [ ] register
- [x] App
  - [x] routeChange listener
  - [x] getPermissions/verifyPermissions
- [x] Layout
  - [x] Header
  - [x] Sider 
  - [x] Footer 
- [ ] Form
- [ ] Upload
- [ ] richEditor  
- [ ] theme  
- [ ] superAdmin
  - [ ] toggle api server
  - [ ] don't logout
  - [ ] get all permissions

### Components `app/Components/`

* LazilyLoad
* LazilyLoadFactory
* importLazy

### util `app/util/`

#### ajax
```
ajax(url, param, fail, error, success) 
```

#### cookie
```
setCookie(name, value, hour)
getCookie(name)
clearCookie(name)
```

#### other
```
notRepeating(callback) 
downLoad(url) [downLoad][downLoad]
checkToken()
```

#### DEBUG
```
DEBUG && console.log('Props: ', props)

if (DEBUG){
  do()
}
```

### Directory Structure

合理的规范有利于项目开发速度，我们推崇高内聚低耦合的代码结构
模块化开发， 分而治之， 各模块同目录下就近维护。
这里，我们规定了项目构建，开发，测试，发布等目录及文件路径：

```
 root
  ├── app                              --client source code
  │   ├── Components                   --公共组件
  │   │     ├── Breadcrumb             --export default Breadcrumb
  │   │     └── LazilyLoad             --export {LazilyLoad, LazilyLoadFactory, importLazy}
  │   ├── Containers
  │   │     ├── App                    --export default Breadcrumb
  │   │     ├── Demo                   --export default Breadcrumb
  │   │     ├── Layput                 --export default Breadcrumb
  │   │     └── Login
  │   ├── static                       --公共静态资源
  │   │     ├── img                    --export default Breadcrumb
  │   │     └── favicon.ico
  │   ├── util                         --公共静态资源
  │   │     ├── ajax                   --ajax
  │   │     └── cookie
  │   ├── config.js                    --config
  │   ├── global.pcss                  --公共样式
  │   ├── index.jsx                    --公用入口
  │   └── Router.jsx   
  ├── build
  │   ├── template.jsx                 --页面模板
  │   ├── webpack.config.js
  │   ├── webpack.dev.js
  │   ├── webpack.pro.js
  │   └── other.js
  ├── dist                             --产品发布目录
  │   ├── backup
  │   └── v1.1.1
  ├── node_modules
  ├── production
  ├── test                           
  ├── .editorconfig
  ├── .eslintignore
  ├── .eslintrc.js
  ├── .gitignore
  ├── .npmignore
  ├── .gitignore
  ├── CHANGELOG.md
  ├── ISSUE.md
  ├── LICENSE
  ├── package.json
  └── README.md
```


[react-component]:(https://facebook.github.io/react/docs/components-and-props.html)
[downLoad]:https://segmentfault.com/a/1190000005863250



  