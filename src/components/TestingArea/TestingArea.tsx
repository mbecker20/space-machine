import React from 'react'
import useJSS from './style'
import audioCtx from '../../audioCtx'
import { makeOscillator, makeSampleHold } from '../../modules/all'

const sampleOsc = makeOscillator('sine', 440, 0)

const sampleHold = makeSampleHold(sampleOsc.audioNode)

sampleHold.audioNode.connect(audioCtx.destination)

function TestingArea() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'testing area'}
      <div className={classes.ButtonDiv}>
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'green' }}
          onClick={() => {
            audioCtx.resume()
          }}
        >start ctx</div>
      </div>
        <div className={classes.Button}
          style={{ backgroundColor: 'blue' }}
          onClick={() => {
            sampleHold.holdSample()
          }}
        >button</div>
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

export default TestingArea