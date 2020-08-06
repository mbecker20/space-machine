import { Modules, Connections, ContainerModule, RootState } from "./stateTSTypes"
import { ObjFrom2Arrays } from "./helpers"
import { stringIn } from "../helpers/genFuncs"
import { CONTAINER } from "../audioModules/moduleTypes"
import { Dispatch } from 'redux'
import { mergeContainer } from './allActions'
import { getContainerModulesConnections } from "./getContainerAsProject"


function genRandomID(index: number, totNumber: number) {
  return `${totNumber}${index}${2048 * Math.random()}`
}

function getReplicatedState(modules: Modules, connections: Connections, totNumberModules: number, totNumberConnections: number) {
  // this function returns a copy of modules and connections, but with all modIDs and connectionIDs replaced.
  // this is done so no IDs conflict when the new modules/connections are merged into the active redux state
  const modIDs = Object.keys(modules)
  const connectionIDs = Object.keys(connections)
  const modIDConverter = ObjFrom2Arrays(modIDs, modIDs.map((modID, index) => {
    return genRandomID(index, totNumberModules)
  }))
  const connectionIDConverter = ObjFrom2Arrays(connectionIDs, connectionIDs.map((connectionID, index) => {
    return genRandomID(index, totNumberConnections)
  }))
  const newModules = ObjFrom2Arrays(Object.values(modIDConverter), modIDs.map(modID => {
    if (modules[modID].moduleType === CONTAINER) {
      const containerMod = modules[modID] as ContainerModule
      return {
        ...containerMod,
        id: modIDConverter[modID],
        inputs: containerMod.inputs
          .filter(connectionID => stringIn(connectionID, connectionIDs))
          .map(connectionID => connectionIDConverter[connectionID]),
        outputs: containerMod.outputs
          .filter(connectionID => stringIn(connectionID, connectionIDs))
          .map(connectionID => connectionIDConverter[connectionID]),
        containerControls: containerMod.containerControls
          .map(containerControl => {
            return {
              controlID: containerControl.controlID,
              modID: modIDConverter[containerControl.modID],
              actualModID: modIDConverter[containerControl.actualModID],
            }
          }),
        childModules: containerMod.childModules.map(id => modIDConverter[id]),
      }
    } else {
      return {
        ...modules[modID],
        id: modIDConverter[modID],
        inputs: modules[modID].inputs
          .filter(connectionID => stringIn(connectionID, connectionIDs))
          .map(connectionID => connectionIDConverter[connectionID]),
        outputs: modules[modID].outputs
          .filter(connectionID => stringIn(connectionID, connectionIDs))
          .map(connectionID => connectionIDConverter[connectionID]),
      }
    }
  }))
  const newConnections = ObjFrom2Arrays(Object.values(connectionIDConverter), connectionIDs.map(connectionID => {
    const connection = connections[connectionID]
    return {
      ...connection,
      fromID: modIDConverter[connection.fromID],
      toID: modIDConverter[connection.toID],
      actualOutputID: connection.actualOutputID ? modIDConverter[connection.actualOutputID] : undefined,
      actualInputID: connection.actualInputID ? modIDConverter[connection.actualInputID] : undefined,
    }
  }))
  return {
    newModules,
    newConnections,
  }
}

function performContainerMerge(dispatch: Dispatch, modulesToMerge: Modules, connectionsToMerge: Connections, totNumberModules: number, totNumberConnections: number) {
  // this function makes a copy of state with above function, then restores all modules and connections,
  // and dispatches an action to merge the copied state with the full project state 
  const { newModules, newConnections } = getReplicatedState(modulesToMerge, connectionsToMerge, totNumberModules, totNumberConnections)
  dispatch(mergeContainer(newModules, newConnections))
}

export function duplicateContainer(dispatch: Dispatch, state: RootState, containerID: string) {
  const { modules, connections } = getContainerModulesConnections(state, containerID)
  const totNumberModules = Object.keys(state.modules).length
  const totNumberConnections = Object.keys(state.connections).length
  performContainerMerge(dispatch, modules, connections, totNumberModules, totNumberConnections)
}

export function loadProjectAsContainer(dispatch: Dispatch, currState: RootState, { modules, connections, baseContainerID }: RootState) {
  // used for loading in projects as containers within an existing project
  const totNumberModules = Object.keys(currState.modules).length
  const totNumberConnections = Object.keys(currState.connections).length
  const { newModules, newConnections } = getReplicatedState(modules, connections, totNumberModules, totNumberConnections)
  const goodNewModules = {
    ...newModules,
    [baseContainerID]: {
      ...newModules[baseContainerID],
      isBaseContainer: false,
    }
  }
  dispatch(mergeContainer(goodNewModules, newConnections))
}