window.treeshake = {}
function square(x) {
  window.treeshake.square = 'square'
  console.log('treeshake square')
  return x * x;
}

function cube(x) {
  console.log('treeshake cube')
  window.treeshake.cube = 'cube'
  return x * x * x;
}

export {
  cube,
  square
}
