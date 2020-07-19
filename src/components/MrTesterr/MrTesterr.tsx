import React from 'react'
import useJSS from './style'
import audioCtx from '../../audioCtx'

/*
var splitter = audioCtx.createChannelSplitter(2)

var lpf = audioCtx.createBiquadFilter()
  lpf.type = "lowpass"
  lpf.frequency.value = 440
  lpf.Q.value = 10
*/

navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false,
    latency: 0
  }
}).then(stream => {
  const src = audioCtx.createMediaStreamSource(stream)
  const gain = audioCtx.createGain()
  const merger = audioCtx.createChannelMerger(2)
  const dly = audioCtx.createDelay(); dly.delayTime.value = .18
  const dlyFdbk = audioCtx.createGain(); dlyFdbk.gain.value = .6
  dly.connect(dlyFdbk); dlyFdbk.connect(dly)
  const master = audioCtx.createGain(); master.gain.value = 1

  gain.gain.value = 5.5
  src.connect(gain, 0, 0)
  gain.connect(merger, 0, 0)
  gain.connect(merger, 0, 1)
  merger.connect(dly)
  dly.connect(master)
  merger.connect(master)
  master.connect(audioCtx.destination)
})

function MrTesterr() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'mr testerrr'}
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'green' }}
          onClick={() => {
            audioCtx.resume()
          }}
        >start ctx</div>
      </div>
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'red' }}
          onClick={() => {
            audioCtx.suspend()
          }}
        >stop ctx</div>
      </div>

    </div>
  );
}

export default MrTesterr