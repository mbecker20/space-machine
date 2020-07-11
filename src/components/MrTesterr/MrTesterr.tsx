import React from 'react'
import useJSS from './style'
//import { makeOscillator, makeGain, makeOutput, makeAutoFilter } from '../../audioModules/all'
//import { connect } from '../../audioModules/connection'

// Successful FM Synth implementation!
// done using new dynamic module connect function

/*
const osc = makeOscillator('sine', 440, 0)
const oscGain = makeGain (1)
const lpf = makeAutoFilter('lowpass', 300, 0, 0, 1)
const output = makeOutput()

connect(osc, oscGain)
connect(oscGain, lpf)
connect(lpf, output)
*/

function MrTesterr() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'mr testerrr'}
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'green' }}
          onClick={() => {
            //output.controls.resume('')
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