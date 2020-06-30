import audioCtx from '../audioCtx'

/*
function makeSampleHold(input:number, hold: number, output: number) {
  const sampleHold = audioCtx.createConstantSource()
  let isHolding = false
  
  function setState(newIsHolding: boolean) {
    isHolding = newIsHolding
  }

  function holding (){
    if (isHolding) {
      //output = held value
    } else {
      //output = input 
    }
  }

}
*/

function makeSampleHold(inputModule: AudioNode) {
  const sampleHold = audioCtx.createOscillator()
/*
  function sampleInput(){
    inputModule. = sampleHold.frequency
  }
  */
  function holdSample() {
    sampleHold.frequency.cancelAndHoldAtTime(audioCtx.currentTime)
  }
}

export default makeSampleHold