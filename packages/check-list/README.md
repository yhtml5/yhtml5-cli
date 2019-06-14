# Check List

## 概念
check list 是一个自动化检测工具, 补充了 eslint/单元测试 等工具之外的功能.
确保代码的质量, 它可以集成到自动化部署脚本中, 也可以配合husky, 实现代码提交前检测

在一个多人协作过程的项目中, 我们会遇到许多问题
- 删除关键性文件, 造成严重问题
- 引入过大的包, 造成性能问题: `import _ from lodash`
- 提交了错误代码: git冲突 `<<<<<<<`
- 使用了特殊兼容性代码, babel只配置es6: `Date.now, [].includes`
- 调试代码未关闭, 使用了 mock数据, debugger, alert
- 部署后, 提醒后续操作内容

## 流程图

config => rule => ruleHandler

npm run check
=> check()
=> rule: handler[type]
=> handler: title/regex/require/limit
=> lib: checkCode/getDirSize/checkRequiredFiles
=> ask
=> console result

## 命令行

在项目根目录下增加config.js

> $ npm i @yhtml5/check-list -g
> $ check ./demo/config.js

## JavaScript API (support soon)
**@yhtml5/check-list** 提供 JavaScript 接口那样可以通过 Node.js 来使用。

> $ npm i @yhtml5/check-list -D

```js
const check = require('@yhtml5/check-list')
check(config)
```

## 配置文件(Configuration files)

配置文件是一个commonjs模块，它对外暴露一个对象，这个对象包含了一些 **@yhtml5/check-list** 需要的一些选项。通常，我们把这个配置文件叫做config.js，它通常位于项目的根目录

### rules
参考 `@yhtml5/check-list/demo/config.js`
config.checkList.rules 是一个规则数组

### type: title
不检查, 输出 describe, 用作分割线
```js
{
  type: 'title',
  describe: 'Check List Rules:',
}
```

### type: require
检查关键性文件是否丢失
```js
{
  type: 'require',
  describe: '检查文件完整性: 关键性文件',
  paths: [__dirname]
}
```

### type: limit
检查文件大小限制
```js
{
  type: 'limit',
  describe: '检查文件大小限制: dist',
  paths: [__dirname],
  min: 10,
  max: 100
}
```

### type: regex
正则匹配文件内容, 返回 buffer, 需要考虑 [空格, 多行, 注释] 等情况
```js
  type: 'regex',
  describe: '检查是否存在: 冲突代码',
  paths: [__dirname],
  regex: /^<<<<<|^>>>>>/gm,
```
