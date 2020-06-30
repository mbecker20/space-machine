import React from 'react'
import useJSS from './style'

function TestingArea() {
  const classes = useJSS()
  return (
    <div className={classes.TestingArea}>
      {'testing area'}
      <div className={classes.ButtonDiv}>
        <div 
          className={classes.Button}
          style={{ backgroundColor: 'blue' }}
          onClick={() => {
            
          }}
        >button</div>
      </div>
    </div>
  );
}

export default TestingArea