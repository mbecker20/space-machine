import { Modules, ContainerModule } from "../../stateTSTypes"
import { RemoveModuleAction } from "../moduleTSTypes"

const removeModule = (state: Modules, { id }: RemoveModuleAction) => {
  const parentID = state[id].parentID as string
  const trimmedState = Object.fromEntries(Object.entries(state).filter(entry => entry[0] !== id))
  return Object.assign({}, trimmedState, Object.fromEntries(Object.entries(trimmedState).map(entry => {
    return [entry[0], { 
        ...entry[1],
        inputs: entry[1].inputs.filter(inputData => inputData.connectedID !== id),
        outputs: entry[1].outputs.filter(outputData => outputData.connectedID !== id)
      }]
    })), {
    [parentID]: {
      ...state[parentID],
      childModules: (state[parentID] as ContainerModule).childModules.filter(childID => childID !== id)
    }
  },)
}

export default removeModule