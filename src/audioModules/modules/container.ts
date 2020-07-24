import { BaseAM, ControlData, ControlSetFuncs, BUTTON } from "../moduleTypes"

export interface ContainerModule extends BaseAM {
  inputModuleID?: string
  outputModuleID?: string
}

function makeContainer(id: string): ContainerModule {
  const controlData: ControlData = {
    'open': {
      controlType: BUTTON,
      paramID: 'n/a',
    }
  }
  const controlSetFuncs: ControlSetFuncs = {
    'open': () => {
      window.fillContainerID = id
      window.reRenderFillContainer()
      window.highlightedID = ''
    }
  }
  return {
    connectingParamIDs: [],
    controlData,
    controlSetFuncs,
  }
}

export default makeContainer