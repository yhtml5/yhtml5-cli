import { config } from '../../config'
import { getCookie } from '../../util/cookie'
import { isObject, isArrayEmpty, isStringEmpty } from '../../util/validator'
import { updateState as updateLoginState } from '../Login/task'
import { UpdateState } from './action'
import { ajaxPermissions, ajaxChannelColumnsList, ajaxLabels, ajaxUploadToken } from './ajax'
import { history } from '../../redux/store'

const { title, root, cookie } = config()

/**
 * Todo
 *
 * 1. Merge [changeSelectChannels/changeSelectColumns、 selectChannels/selectColumns]
 *
 */

function updateState(data) {
  if (isObject(data)) {
    return {
      type: UpdateState,
      payload: data
    }
  } else {
    console.error('action updateState params must be a object')
  }
}

function initializeApp() {
  process.env.NODE_ENV === 'production' || console.log('initializeApp', getCookie(cookie.token))

  return (dispatch, getState) => {
    dispatch(updateLoginState({
      token: getCookie(cookie.token),
    }))
  }
}


export {
  updateState,
  initializeApp,
}
