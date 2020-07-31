import { RemoveConnectionAction } from "../connectionTSTypes"
import { Modules, Connections } from "../../stateTSTypes"
import { filterOutFromObj } from "../../helpers"

const removeConnection = (modules: Modules, connections: Connections, { connectionID }: RemoveConnectionAction) => {
  const { fromID, toID, containerOutputChildID, containerInputChildID } = connections[connectionID]
  return {
    newModules: Object.assign({}, modules, {
      [fromID]: {
        ...modules[fromID],
        outputs: modules[fromID].outputs.filter(id => id !== connectionID)
      },
      [toID]: {
        ...modules[toID],
        inputs: modules[toID].inputs.filter(id => id !== connectionID)
      }
    }, !containerOutputChildID ? {} : {
      [containerOutputChildID]: {
        ...modules[containerOutputChildID],
        outputs: modules[containerOutputChildID].outputs.filter(id => id !== connectionID)
      }
    }, !containerInputChildID ? {} : {
      [containerInputChildID]: {
        ...modules[containerInputChildID],
        inputs: modules[fromID].outputs.filter(id => id !== connectionID)
      }
    }),
    newConnections: filterOutFromObj(connections, [ connectionID ])
  }
}

export default removeConnection