import { RootState, ContainerModule, Modules, Connections } from "./stateTSTypes";
import { CONTAINER } from "../audioModules/moduleTypes";
import { keepOnlyIdsInObj } from "./helpers";
import { bothStringsIn } from "../helpers/genFuncs";

function getChildrenRecursive(containerID: string, modules: Modules): string[] {
  const childIDs = (modules[containerID] as ContainerModule).childModules
  let containerChildIDs: string[] = []
  for (const i in childIDs) {
    if (modules[childIDs[i]].moduleType === CONTAINER) {
      containerChildIDs = [...containerChildIDs, ...getChildrenRecursive(childIDs[i], modules) ]
    }
  }
  return [ ...childIDs, ...containerChildIDs ]
}

export function getContainerIDs(containerID: string, modules: Modules) {
  return [ containerID, ...getChildrenRecursive(containerID, modules) ]
}

function getInternalConnections(connections: Connections, trimmedIDs: string[]) {
  const allConnectionIDs = Object.keys(connections)
  let connectionIDs: string[] = []
  for (const i in allConnectionIDs) {
    const { fromID, toID, actualOutputID, actualInputID } = connections[allConnectionIDs[i]]
    const actualFromID = actualOutputID ? actualOutputID : fromID // actualIDs undefined if no containers involved in connection
    const actualToID = actualInputID ? actualInputID : toID
    if (bothStringsIn(actualFromID, actualToID, trimmedIDs)) {
      connectionIDs = [...connectionIDs, allConnectionIDs[i] ]
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