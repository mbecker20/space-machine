import { BaseAM, ControlData, ControlSetFuncs } from "../moduleTypes"

export interface ContainerModule extends BaseAM {
  inputModuleID?: string
  outputModuleID?: string
}

export function makeContainerControlData(): ControlData {
  return {
    
  }
}

function makeContainer(id: string): ContainerModule {
  const controlSetFuncs: ControlSetFuncs = {
    
  }
  return {
    connectingParamIDs: [],
    controlSetFuncs,
  }
}

export default makeContainer