import isType from './src/isType';
import cookie from './src/cookie';
import downLoad from './src/download';
import notRepeat from './src/notRepeat';
import parseUrl from './src/parseUrl';
import formatNumber from './src/formatNumber';
import author from './src/author';

const utils = {
  ...isType,
  ...cookie,
  ...parseUrl,
  downLoad,
  notRepeat,
  formatNumber,
  author
}

console.log(utils)

// export default utils
