import { Modules } from "../../stateTSTypes"

const disconnectInputModule = (state: Modules) => {
  return Object.assign({}, state, {
    [window.fillContainerID]: {
      ...state[window.fillContainerID],
      inputModuleID: undefined,
    }
  })
}

export default disconnectInputModule