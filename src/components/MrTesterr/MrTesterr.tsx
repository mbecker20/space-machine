import React from 'react'
import useJSS from './style'

const context = new AudioContext()

async function makeStreamSource() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  })

  return context.createMediaStreamSource(stream)
}

const lineInSource = await makeStreamSource()

lineInSource.connect(context.destination)

function MrTesterr() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'mr testerrr'}
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'green' }}
          onClick={() => {
            context.resume()
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
            //output.controls.suspend('')
          }}
        >stop ctx</div>
      </div>

    </div>
  );
}

export default MrTesterr