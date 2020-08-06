import { RootState, ContainerModule, Modules, Connections } from "./stateTSTypes";
import { CONTAINER } from "../audioModules/moduleTypes";
import { keepOnlyIdsInObj } from "./helpers";
import { bothStringsIn } from "../helpers/genFuncs";

function getChildrenRecursive(containerID: string, modules: Modules): string[] {
  const childIDs = (modules[containerID] as ContainerModule).childModules
  let containerChildIDs: string[] = []
  for (const childID in childIDs) {
    if (modules[childID].moduleType === CONTAINER) {
      containerChildIDs = [...containerChildIDs, ...getChildrenRecursive(childID, modules) ]
    }
  }
  return [ ...childIDs, ...containerChildIDs ]
}

function getInternalConnections(connections: Connections, trimmedIDs: string[]) {
  let connectionIDs: string[] = []
  for (const connectionID in Object.keys(connections)) {
    const { fromID, toID, actualOutputID, actualInputID } = connections[connectionID]
    const actualFromID = actualOutputID ? actualOutputID : fromID // actualIDs undefined if no containers involved in connection
    const actualToID = actualInputID ? actualInputID : toID
    if (bothStringsIn(actualFromID, actualToID, trimmedIDs)) {
      connectionIDs = [ ...connectionIDs, connectionID ]
    }
  }
  return keepOnlyIdsInObj(connections, connectionIDs) as Connections
}

export function getContainerModulesConnections(state: RootState, containerID: string) {
  const trimmedIDs = [containerID, ...getChildrenRecursive(containerID, state.modules)]
  const trimmedModules = keepOnlyIdsInObj(state.modules, trimmedIDs)
  const trimmedConnections = getInternalConnections(state.connections, trimmedIDs)
  return {
    modules: trimmedModules,
    connections: trimmedConnections,
  }
}


export function getContainerAsProject(state: RootState, containerID: string) {
  const trimmedIDs = [ containerID, ...getChildrenRecursive(containerID, state.modules) ]
  const trimmedModules = keepOnlyIdsInObj(state.modules, trimmedIDs)
  const trimmedConnections = getInternalConnections(state.connections, trimmedIDs)
  return {
    baseContainerID: containerID,
    modules: {
      ...trimmedModules,
      [containerID]: {
        ...trimmedModules[containerID],
        isBaseContainer: true,
        parentID: null,
      },
    },
    connections: trimmedConnections
  }
}