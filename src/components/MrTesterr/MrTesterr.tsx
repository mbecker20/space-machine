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
    latency: 0,
    channelCount: 3,
  }
}).then(stream => {
  const src = audioCtx.createMediaStreamSource(stream)
  const splitter = audioCtx.createChannelSplitter(3)
  const gain0 = audioCtx.createGain()
  const gain1 = audioCtx.createGain()
  const gain2 = audioCtx.createGain()
  const merger = audioCtx.createChannelMerger(3)
  //const dly = audioCtx.createDelay(); dly.delayTime.value = .18
  //const dlyFdbk = audioCtx.createGain(); dlyFdbk.gain.value = .6
  //dly.connect(dlyFdbk); dlyFdbk.connect(dly)
  const master = audioCtx.createGain(); master.gain.value = 1

  console.log(stream.getAudioTracks()[0].getCapabilities())

  master.gain.value = 1

  src.connect(splitter)
  splitter.connect(gain0, 0)
  splitter.connect(gain1, 1)
  splitter.connect(gain2, 2)
  gain0.connect(master)
  gain1.connect(master)
  gain2.connect(master)
  //merger.connect(master)
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