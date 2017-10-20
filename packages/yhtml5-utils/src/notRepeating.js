let awaitStatus = true

const timer = (time) => new Promise((resolve) => setTimeout(resolve, time))

async function notRepeating({
  callback = () => { },
  time = 1000
}) {
  if (awaitStatus) {
    awaitStatus = false
    callback()
    await timer(time)
    awaitStatus = true
  }
}

export default notRepeating
