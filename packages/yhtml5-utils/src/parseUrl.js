function parseUrlToObject() {
  const reg = /([^#?&]*)=([^&#]*)/g;
  const args = window.location.href;
  const query = {};
  let re = reg.exec(args);
  while (re) {
    query[re[1]] = re[2];
    re = reg.exec(args);
  }
  return query;
}

function parseObjectToUrl() {

}

export {
  parseUrlToObject,
  parseObjectToUrl
}
