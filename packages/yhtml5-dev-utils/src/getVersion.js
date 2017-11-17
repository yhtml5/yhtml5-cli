const formatMoment = (moment) => (moment < 10) ? "0" + "" + moment : moment

const year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  day = new Date().getDate(),
  hour = new Date().getHours(),
  minute = new Date().getMinutes(),
  second = new Date().getSeconds()
// return formatMoment(year) + '' + formatMoment(month) + '' + formatMoment(day) + '' + formatMoment(hour) + '' + formatMoment(minute) + '' + formatMoment(second)

const time = `${formatMoment(year)}${formatMoment(month)}${formatMoment(day)}${formatMoment(hour)}${formatMoment(minute)}${formatMoment(second)}`

const getVersion = ({ packageVersion = '' }) =>
  'v' + packageVersion + (/[a-zA-Z]/.test(packageVersion)) ? '' : ('-' + time)


module.exports = getVersion
