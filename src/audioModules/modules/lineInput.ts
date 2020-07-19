import audioCtx from '../../audioCtx'

//export interface 

async function makeLineInput() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  })
  const lineInput = audioCtx.createMediaStreamSource(stream)
}