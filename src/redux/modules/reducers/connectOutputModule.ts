import { Modules } from "../../stateTSTypes";
import { ConnectOutputModuleAction } from "../moduleTSTypes";

const connectOutputModule = (state: Modules, { id }: ConnectOutputModuleAction) => {
  return Object.assign({}, state, {
    [window.fillContainerID]: {
      ...state[window.fillContainerID],
      outputModuleID: id,
    }
  })
}

export default connectOutputModule