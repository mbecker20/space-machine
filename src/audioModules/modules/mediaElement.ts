import audioCtx from "../../audioCtx"
import { RefObject } from 'react'
import { BaseAM, ControlData, ControlSetFuncs, FILE } from "../moduleTypes"

export interface MediaElementModule extends BaseAM {
  audioNode: MediaElementAudioSourceNode
  ref: RefObject<HTMLAudioElement>
}

function makeMediaElement(audioRef: RefObject<HTMLAudioElement>): MediaElementModule | null {
  if (audioRef.current) {
    const mediaElement = audioCtx.createMediaElementSource(audioRef.current)

    const controlData: ControlData = {
      'set file': {
        controlType: FILE,
        paramID: 'n/a'
      }
    }

    const controlSetFuncs: ControlSetFuncs = {
      'set file': (url: string) => {
        (audioRef.current as HTMLAudioElement).src = url
      }
    }

    return {
      audioNode: mediaElement,
      ref: audioRef,
      connectingParamIDs: [],
      controlData,
      controlSetFuncs,
      connectionInputs: [],
      connectionOutputs: ['0'],
    }
  } else {
    return null
  }
}

export default makeMediaElement