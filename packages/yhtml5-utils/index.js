import isType from './src/isType';
import cookie from './src/cookie';
import downLoad from './src/download';
import notRepeating from './src/notRepeating';

const utils = {
  ...isType,
  ...cookie,
  downLoad,
  notRepeating
}

export default utils
