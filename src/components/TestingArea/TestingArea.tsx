import React from 'react'
import useJSS from './style'
import { makeOscillator, makeGate, makeGain } from '../../audioModules/all';
import makeOutput from '../../audioModules/output';
import audioCtx from '../../audioCtx'

const modOsc = makeOscillator('sine', 0.1, 0)
const modGain = makeGain(1000)

const carOsc = makeOscillator('sine', 50, 0)
const carGain = makeGain(1)

const output = makeOutput()

modOsc.connect(modGain)
modGain.audioNode.connect(carOsc.audioNode.frequency)
carOsc.connect(carGain)

carGain.connect(output)



//import { makeOscillator } from '../../modules/all'

//const sampleOsc = makeOscillator('sine', .5, 0)

//sampleHold.audioNode.connect(audioCtx.destination)

/*
const osc = makeOscillator('sine', 440, 0)
const osc2 = makeOscillator('sine', 350, 0)
const gate = makeGate(1, 2)
const gate2 = makeGate(1, 2)
const output = makeOutput()

osc.connect(gate)

osc2.connect(gate2)

gate2.connect(output)
*/

/*
const modOsc = audioCtx.createOscillator()
  modOsc.type = 'sine'
  modOsc.frequency.value = 1000
const modGain = audioCtx.createGain()
  modGain.gain.value = 100
const carOsc = audioCtx.createOscillator()
  carOsc.type = 'sine'
  carOsc.frequency.value = 100
const carOscGain = audioCtx.createGain()
  carOscGain.gain.value = 1
const gainModOsc = audioCtx.createOscillator()
  gainModOsc.type = 'sine'
  gainModOsc.frequency.value = 1
const gainModOscGain = audioCtx.createGain()
  gainModOscGain.gain.value = 1


modOsc.connect(modGain)
gainModOsc.connect(gainModOscGain)
gainModOscGain.connect(carOscGain.gain)
modGain.connect(carOsc.frequency)
carOsc.connect(carOscGain)
carOscGain.connect(audioCtx.destination)

modOsc.start()
gainModOsc.start()
carOsc.start()
*/

function TestingArea() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'testing area'}
      <div className={classes.ButtonDiv}>
        <div className={classes.Button}
          style={{ backgroundColor: 'blue' }}
          onClick={() => {
            //gate2.controls.openGate()
          }}
        >open gate2</div>
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
            audioCtx.suspend()
          }}
        >stop ctx</div>
      </div>
    </div>
  );
}

export default TestingArea