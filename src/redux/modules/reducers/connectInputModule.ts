import { Modules } from "../../stateTSTypes";
import { ConnectInputModuleAction } from "../moduleTSTypes";

const connectInputModule = (state: Modules, { id }: ConnectInputModuleAction) => {
  return Object.assign({}, state, {
    [window.fillContainerID]: {
      ...state[window.fillContainerID],
      inputModuleID: id,
    }
  })
}

export default connectInputModule