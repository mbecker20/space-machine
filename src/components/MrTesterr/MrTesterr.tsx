import React from 'react'
import useJSS from './style'

const context = new AudioContext();

if (context.state === 'suspended') {
  await context.resume();
}

const stream = await navigator.mediaDevices
  .getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  });
const lineInSource = context.createMediaStreamSource(stream);

lineInSource.connect(context.destination);


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