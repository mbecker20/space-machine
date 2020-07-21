import { BaseAM, ControlData, ControlSetFuncs } from "../moduleTypes"

export interface ContainerModule extends BaseAM {
  inputModuleID?: string
  outputModuleID?: string
}

function makeContainer(): ContainerModule {
  const controlData: ControlData = {

  }
  const controlSetFuncs: ControlSetFuncs = {
    
  }
  return {
    connectingParamIDs: [],
    controlData,
    controlSetFuncs,
    connectionInputs: [],
    connectionOutputs: [],
  }
}

export default makeContainer