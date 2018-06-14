/**
 * - create script success and callback
 * - promise async/await
 * - ie
 * - jquery: https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L8569
 *
 */

function createScript(src, callback) {
  if (!src) return;
  var _callback = callback || function () { };
  var script = document.createElement('script');
  script.setAttribute('src', src);
  // script.setAttribute('charset', sBianMa);
  // script.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('head')[0].appendChild(script);
  // ie browser
  if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
    script.onreadystatechange = function () {
      if (this.readyState == 'loaded' || this.readyState == 'complete') {
        script.parentNode.removeChild(script);
        // if (callback) callback();
        console.log('ie');
        _callback();
      }
    };
  } else if (/gecko/.test(window.navigator.userAgent.toLowerCase()) ||
    /opera/.test(window.navigator.userAgent.toLowerCase())) {
    script.onload = function () {
      script.parentNode.removeChild(script);
      console.log('firefox');
      _callback();
    };
  } else {
    script.parentNode.removeChild(script);
    console.log('other');
    _callback();
  }
}

function createScriptAsync(url) {
  return new Promise(function (resolve, reject) {
    createScript(url, resolve);
  })
}

export { createScript, createScriptAsync };
