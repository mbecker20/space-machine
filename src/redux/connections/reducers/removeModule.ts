import { Modules, ContainerModule, Connections } from "../../stateTSTypes"
import { filterOutFromObj } from "../../helpers"
import { stringIn } from "../../../helpers/genFuncs"
import { RemoveModuleAction } from "../connectionTSTypes"
import { CONTAINER } from "../../../audioModules/moduleTypes"
import { getContainerIDs, getInternalConnectionIDs } from "../../getContainerAsProject"

const removeModule = (modules: Modules, connections: Connections, { id }: RemoveModuleAction) => {
  const parentID = modules[id].parentID as string
  const toTrimModIDs = modules[id].moduleType === CONTAINER ? getContainerIDs(id, modules) : [ id ]
  const toTrimConnectionIDs = modules[id].moduleType === CONTAINER ? 
    [...modules[id].inputs, ...modules[id].outputs, ...getInternalConnectionIDs(connections, toTrimModIDs)] 
    : [...modules[id].inputs, ...modules[id].outputs]
  const trimmedModules = filterOutFromObj(modules, toTrimModIDs) as Modules
  return {
    newModules: Object.assign({}, Object.fromEntries(Object.entries(trimmedModules).map(entry => {
      return [entry[0], {
        ...entry[1],
        inputs: entry[1].inputs.filter(inputData => !stringIn(inputData, [...modules[id].inputs, ...modules[id].outputs])),
        outputs: entry[1].outputs.filter(outputData => !stringIn(outputData, [...modules[id].inputs, ...modules[id].outputs]))
      }]
    })), {
      [parentID]: {
        ...modules[parentID],
        childModules: (modules[parentID] as ContainerModule).childModules.filter(childID => childID !== id),
        connectionInputs: (modules[parentID]).connectionInputs.filter(inputID => inputID !== id),
        connectionOutputs: (modules[parentID]).connectionOutputs.filter(outputID => outputID !== id),
        containerControls: (modules[parentID] as ContainerModule).containerControls.filter(({ modID }) => modID !== id),
      }
    }, ),
    newConnections: filterOutFromObj(connections, toTrimConnectionIDs),
  }
}

export default removeModule