import audioCtx from '../../audioCtx'

async function makeReverb() {
  const convolver = audioCtx.createConvolver()

  let response = await fetch("")
  let arraybuffer = await response.arrayBuffer()
  convolver.buffer = await audioCtx.decodeAudioData(arraybuffer)

  return convolver
}

makeReverb().then(convolver => {
  
})

