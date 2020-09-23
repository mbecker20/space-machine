declare global {
  interface Window {
    usingElectron: boolean
  }
}

function setUserAgent() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf(' electron/') > -1) {
    window.usingElectron = true
  } else {
    window.usingElectron = false
  }
}

export default setUserAgent