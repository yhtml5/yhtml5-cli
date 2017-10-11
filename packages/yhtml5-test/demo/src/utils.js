

const isArrayNotEmpty = (value) => Array.isArray(value) && value.length > 0

function circular() {
  const a = {}
  const b = {}

  a.c = b
  b.c = a
}

export {
  isArrayNotEmpty,
  circular
}
