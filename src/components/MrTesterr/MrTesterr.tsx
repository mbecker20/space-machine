import React from 'react'
import useJSS from './style'
import audioCtx from '../../audioCtx'

interface Thing {
  audioNode?: MediaStreamAudioSourceNode
}

const thing: Thing = {}

var splitter = audioCtx.createChannelSplitter(2)
var merger = audioCtx.createChannelMerger(2)
var lpf = audioCtx.createBiquadFilter()
  lpf.type = "lowpass"
  lpf.frequency.value = 440
  lpf.Q.value = 10

navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false,
    latency: 0
  }
}).then(stream => {
  thing.audioNode = audioCtx.createMediaStreamSource(stream)
})

thing.lineInSource.connect(splitter)
splitter.connect(lpf, 1)
lpf.connect(merger, 0, 1)
splitter.connect(merger, 0, 0)
merger.connect(audioCtx.destination)

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
          style={{ backgroundColor: 'blue' }}
        >
          {'osc freq'}
          <input style={{ height: '2em' }}
            
            onChange={(e) => {
              //osc.controls['set frequency'](e.target.value)
            }}
          />
        </div>
      </div>
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'blue' }}
        >
          {'lpf freq'}
          <input style={{ height: '2em' }}
            
            onChange={(e) => {
              //lpf.controls['set frequency'](e.target.value)
            }}
          />
        </div>
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