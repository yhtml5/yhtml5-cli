function author(options) {
  const value = options || {}
  const name = value.name || 'YHTML5'
  const url = value.url || 'https://github.com/yhtml5'
  console.clear()
  console.log(
    `%c ${name} %c Copyright \xa9 2015-%s`,
    'font-family: "microsoft yahei", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;",
    (new Date).getFullYear());
  console.log(
    "%c We work hard to contribute our work back to the web, mobile, big data, && new Front - End technology.",
    "color:#333;font-size:16px;margin:4px;");
  console.log(
    "%c 温馨提示：请不要调皮地在此粘贴执行任何内容，这可能会导致您的账户受到攻击，给您带来损失 ！^_^",
    "color:#333;font-size:16px;margin:4px;"
  )
  console.log(
    `%c${url}`,
    "color:#333;font-size:16px;margin:4px;");
}

window.yhtml5 = author

export default author
