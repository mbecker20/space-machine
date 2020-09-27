declare global {
  interface Window {
    webkitAudioContext: AudioContext
  }
}

const AudioContext = window.AudioContext || window.webkitAudioContext // works with safari
const audioCtx = new AudioContext()
export default audioCtx