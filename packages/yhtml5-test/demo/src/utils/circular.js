function circular() {
  const a = {}
  const b = {}

  a.c = b
  b.c = a
}

export {
  circular
}
