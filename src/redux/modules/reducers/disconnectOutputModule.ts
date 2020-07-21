import { Modules } from "../../stateTSTypes"

const disconnectOutputModule = (state: Modules) => {
  return Object.assign({}, state, {
    [window.fillContainerID]: {
      ...state[window.fillContainerID],
      outputModuleID: undefined,
    }
  })
}

export default disconnectOutputModule