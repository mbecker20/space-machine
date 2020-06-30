import React from 'react'
import useJSS from './style'

function TestingArea() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'TestingArea'}
      <div className={classes.ButtonDiv}>
        <div 
          className={classes.Button}
          style={{ backgroundColor: 'blue' }}
        >button</div>
      </div>
    </div>
  );
}

export default TestingArea