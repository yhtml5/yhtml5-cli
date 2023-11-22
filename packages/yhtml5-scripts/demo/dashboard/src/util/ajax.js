import reqwest from 'reqwest'
import { message } from 'antd'
import { config } from '../config.js'
import { history } from '../redux/store.js'
import { getCookie } from './cookie.js'
import { isString, isObject, isFunction } from './validator.js'
let { cookie, entryUrl } = config()

function ajax(url, param, fail, error, success) {
  // console.clear()
  if (!isString(url)) {
    return console.warn('ajax url should be a non-empty string')
  } else if (!(isObject(param) || isString(param))) {
    return console.warn('ajax param should be the object')
  } else if (!(isFunction(fail) && isFunction(error) && isFunction(success))) {
    return console.warn('ajax callback should be a function')
  } else { }
  let newParam = {
    data: JSON.stringify(param),
    token: getCookie(cookie.token)
  }
  console.warn('ajaxParam-' + url + ': ', newParam)
  reqwest({
    url: `${process.env.APP_BASE_URL}/${url}`,
    type: 'json',
    method: 'get',
    data: newParam,
    contentType: 'application/json',
    error: function (error) {
      // setTimeout(() => message.destroy(), 200)
      message.error('网络异常, http状态码：' + 500, 3);
      console.error(error)
      fail()
    },
    success: function (response) {
      // setTimeout(() => message.destroy(), 200)
      if (Number(response.code) === 20000) {
        success(response)
      } else if (Number(response.code) === 50002) {
        message.info('当前登录状态已失效，2秒后自动将跳转到登录页...', 3)
        setTimeout(() => {
          history.push(entryUrl)
        }, 2000)
      } else {
        message.error((response.error.errorMsg) ? response.error.errorMsg : '网络异常')
        error()
      }
      console.warn('ajaxResponse-' + url + ': ', response)
    }
  })
}

export default ajax
