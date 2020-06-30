import audioCtx from '../audioCtx'

function makeSampleHold(inputModule: AudioNode) {
  const sampleHold = audioCtx.createOscillator()
  sampleHold.frequency.value = .5
  inputModule.connect(sampleHold.frequency)
  function holdSample() {
    sampleHold.frequency.cancelAndHoldAtTime(audioCtx.currentTime)
  }
  sampleHold.start()
  return { audioNode: sampleHold, holdSample }
}

export default makeSampleHold