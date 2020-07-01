import React from 'react'
import useJSS from './style'
import { makeOscillator, makeGain, makeOutput } from '../../audioModules/all'
import { connect } from '../../audioModules/connection'

// Successful FM Synth implementation!
// done using new dynamic module connect function

const modOsc = makeOscillator('sine', 0.1, 0)
const modGain = makeGain(1000)

const carOsc = makeOscillator('sine', 50, 0)
const carGain = makeGain(1)

const output = makeOutput()

connect(modOsc, modGain)
connect(modGain, carOsc, 'frequency')
connect(carOsc, carGain)

connect(carGain, output)

//modOsc.connect(modGain)
//modGain.audioNode.connect(carOsc.audioNode.frequency)
//carOsc.connect(carGain)

//carGain.connect(output)

function TestingArea() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'testing area'}
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'green' }}
          onClick={() => {
            output.controls.resume()
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
              //osc.controls.setFrequency(Number(e.target.value))
            }}
          />
        </div>
      </div>
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'blue' }}
        >
          {'osc2 freq'}
          <input style={{ height: '2em' }}
            
            onChange={(e) => {
              //osc2.controls.setFrequency(Number(e.target.value))
            }}
          />
        </div>
      </div>
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'red' }}
          onClick={() => {
            output.controls.suspend()
          }}
        >stop ctx</div>
      </div>
    </div>
  );
}

export default TestingArea