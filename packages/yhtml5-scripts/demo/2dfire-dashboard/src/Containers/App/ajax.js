import { message } from 'antd'
import reqwest from 'reqwest'
import ajax from '../../util/ajax'
import { config } from '../../config'
import { getCookie } from '../../util/cookie'
import { updateState } from './task'
const { cookie } = config()

/**
 * Todo Mapping Parameters
 *
 * @param {object} params
 * @param {function} dispatch
 */


const mock = [{
  "key": "1",
  "children": [{ "key": "10" }, { "key": "11" }, { "key": "12" }, { "key": "13" }, { "key": "14" }, { "key": "15" }, { "key": "16" }, { "key": "17" }, { "key": "18" }, { "key": "19" }]
}, {
  "key": "2",
  "children": [{ "key": "20" }, { "key": "21" }, { "key": "22" }, { "key": "23" }, { "key": "24" }, { "key": "25" }]
}, {
  "key": "3",
  "children": [{ "key": "30" }, { "key": "31" }, { "key": "32" }, { "key": "33" }, { "key": "34" }, { "key": "35" }, { "key": "36" }]
}, {
  "key": "9",
  "children": [{ "key": "90" }, { "key": "91" }, { "key": "92" }, { "key": "93" }, { "key": "94" }, { "key": "95" },]
}]


const ajaxPermissions = (params, dispatch) =>
  new Promise((resolve) => {
    dispatch(updateState({ permissions: mock }))
    resolve()
  })

export {
  ajaxPermissions
}
