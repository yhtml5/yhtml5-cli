function config() {
  let isMock = false
  return {
    entryUrl: '/login',
    version: process.env.version || '开发测试版',
    title: process.env.APP_TITLE || 'Title',
    subTitle: '管',
    copyright: '2dfire.com',
    root: {
      name: '2dfire',
      password: '123456'
    },
    cookie: {
      token: 'Hs6qoOHka3s78dbT',
      tokenValue: 'yqwe0OdsD',
      userName: 'srdf',
      userValue: ''
    },
    siteMap: [{
      key: '1',
      name: '基础组件',
      icon: 'api',
    }, {
      key: '3',
      name: '模板页面',
      icon: 'book',
    }, {
      key: '9',
      name: '系统功能',
      icon: 'setting',
    }, {
      key: '11',
      name: '功能函数',
      pathname: '/function',
    }, {
      key: '12',
      name: '表单正则',
      pathname: '/form',
    }, {
      key: '14',
      name: '文件上传',
      pathname: '/upload',
    }, {
      key: '15',
      name: 'Rich Editor',
      pathname: '/richEditor',
    }, {
      key: '17',
      name: 'Markdown',
      pathname: '/markdown',
    }, {
      key: '30',
      name: 'Demo',
      pathname: '/demo',
    }, {
      key: '32',
      name: '导航管理',
      pathname: '/navigation',
      items: [{
        name: '新增',
        pathname: '/add'
      }, {
        name: '编辑',
        pathname: '/edit',
      }]
    }, {
      key: '33',
      name: '套餐管理',
      pathname: '/packages',
      items: [{
        name: '新增',
        pathname: '/add'
      }, {
        name: '编辑',
        pathname: '/edit',
      }]
    }, {
      key: '34',
      name: '直播管理',
      pathname: '/live',
      items: [{
        name: '新增',
        pathname: '/live/add'
      }, {
        name: '编辑',
        pathname: '/live/edit',
      }]
    }, {
      key: '36',
      name: '问答管理',
      pathname: '/question',
      items: [{
        name: '新增',
        pathname: '/question/add'
      }, {
        name: '编辑',
        pathname: '/question/edit',
      }]
    }, {
      key: '91',
      name: '开发文档',
      pathname: '/document'
    }]
  }
}

function searchMenuWithKey(key) {
  let obj = {}

  config().siteMap.forEach((value, index) => {
    if (value.key === key) {
      return obj = config().siteMap[index]
    }
  })
  return obj
}

function searchKeyWithPathname() {
  // let index = config().siteMap.findIndex((value, index) => value.pathname === window.location.hash.split('#')[1])
  let index = config().siteMap.findIndex((value, index) => {
    const url = window.location.hash.split('#')[1]
    const url2 = url.split('/')[0]
    return (value.pathname ? value.pathname : 1) === (url2 ? url2 : url)
  })

  if (window.location.hash.split('#')[1] === '/') {
    return config().siteMap[2].key
  } else if (index < 0) {
    return false
  } else {
    return config().siteMap[index].key
  }
}
console.log('\nconfig.js\n', {
  process,
  'process.env': process.env
})

window.appProcess = process

export {
  config,
  searchMenuWithKey,
  searchKeyWithPathname
}




