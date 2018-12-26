(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.download = factory());
}(this, (function () { 'use strict';

const downLoad = ({
  name = 'download',
  url = ''
}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (Object.prototype.toString.call(url) !== '[object String]' && !url) {
      console.error('The function downLoad url should be a not empty string');
      return
    }
  }
  let a = document.createElement('a');
  a.href = encodeURI(url);
  a.download = name;
  a.id = name;
  a.style.display = 'none';
  // a.click()
  document.body.appendChild(a);
  document.getElementById(name).click();
  document.body.removeChild(document.getElementById(name));
  a = null;
};

return downLoad;

})));
