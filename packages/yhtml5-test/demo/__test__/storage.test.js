it('storageMock', () => {
  localStorage.setItem('localStorage', 'localStorage')
  sessionStorage.setItem('sessionStorage', 'sessionStorage')
  document.cookie = 'cookie'
  const localStorageValue = localStorage.getItem('localStorage')
  const sessionStorageValue = sessionStorage.getItem('sessionStorage')
  const cookieValue = document.cookie

  // console.log({
  //   localStorage,
  //   sessionStorage,
  //   cookieValue
  // })

  expect(localStorageValue).toEqual('localStorage')
  expect(sessionStorageValue).toEqual('sessionStorage')
  expect(cookieValue).toEqual('cookie')
})
