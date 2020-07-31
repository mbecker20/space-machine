import { BaseAM, ControlData, ControlSetFuncs, BUTTON } from "../moduleTypes"

export interface ContainerModule extends BaseAM {
  inputModuleID?: string
  outputModuleID?: string
}

function makeContainer(id: string): [ ContainerModule, ControlData ] {
  const controlData: ControlData = {
    'open': {
      controlType: BUTTON,
      paramID: 'n/a',
    }
  }
  const controlSetFuncs: ControlSetFuncs = {
    'open': () => {
      window.fillContainerID = id
      window.highlightedID = ''
      window.currUnHighlight = () => {}
      window.reRenderFillContainer()
    }
  }
  return [
    {
      connectingParamIDs: [],
      controlSetFuncs,
    },
    controlData,
  ]
}

export default makeContainer