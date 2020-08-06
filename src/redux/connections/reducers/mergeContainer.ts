import { Modules, Connections, ContainerModule } from "../../stateTSTypes"
import { MergeContainerAction, ConnectionReducerReturn } from "../connectionTSTypes"

const mergeContainer = (modules: Modules, connections: Connections, { containerID, newModules, newConnections, row, col, parentID }: MergeContainerAction): ConnectionReducerReturn => {
  return {
    newModules: Object.assign({}, modules, newModules, {
      [parentID]: {
        ...modules[parentID],
        childModules: [ ...(modules[parentID] as ContainerModule).childModules, containerID ]
      },
      [containerID]: {
        ...newModules[containerID],
        row,
        col,
      }
    }),
    newConnections: Object.assign({}, connections, newConnections)
  }
}

export default mergeContainer