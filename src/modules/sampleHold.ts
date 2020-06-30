import audioCtx from '../audioCtx'

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