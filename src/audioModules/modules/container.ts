import { BaseAM, ControlData, ControlSetFuncs, BUTTON } from "../moduleTypes"

export interface ContainerModule extends BaseAM {
  inputModuleID?: string
  outputModuleID?: string
}

export function makeContainerControlData(): ControlData {
  return {
    'open': {
      controlType: BUTTON,
    },
  }
}

function makeContainer(id: string): ContainerModule {
  const controlSetFuncs: ControlSetFuncs = {
    'open': () => {
      window.fillContainerID = id
      window.highlightedID = ''
      window.currUnHighlight = () => {}
      window.reRenderFillContainer()
    },
  }
  return {
    connectingParamIDs: [],
    controlSetFuncs,
  }
}

export default makeContainer