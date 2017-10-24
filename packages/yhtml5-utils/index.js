import isType from './src/isType';
import cookie from './src/cookie';
import downLoad from './src/download';
import notRepeating from './src/notRepeating';
import parseUrl from './src/parseUrl';

const utils = {
  ...isType,
  ...cookie,
  ...parseUrl,
  downLoad,
  notRepeating
}

console.log(utils)

// export default utils
