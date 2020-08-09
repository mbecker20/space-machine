import { Modules, Connections, ContainerModule, RootState } from "./stateTSTypes"
import { ObjFrom2Arrays } from "./helpers"
import { stringIn } from "../helpers/genFuncs"
import { CONTAINER } from "../audioModules/moduleTypes"
import { Dispatch } from 'redux'
import { mergeContainer } from './allActions'
import { getContainerModulesConnections } from "./getContainerAsProject"
import mergeExistingContainerAM from "../audioModules/mergeExistingAM"
import genRandomID from "./idGen"


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
        parentID: modules[modID].parentID ? modIDConverter[modules[modID].parentID as string] : null
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
        parentID: modIDConverter[modules[modID].parentID as string]
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
    modIDConverter,
    newModules,
    newConnections,
  }
}

export function performContainerMerge(dispatch: Dispatch, modulesToMerge: Modules, connectionsToMerge: Connections, totNumberModules: number, totNumberConnections: number, parentID: string, containerID: string, row: number, col: number) {
  // this function makes a copy of state with above function, then restores all modules and connections,
  // and dispatches an action to merge the copied state with the full project state 
  const { modIDConverter, newModules, newConnections } = getReplicatedState(modulesToMerge, connectionsToMerge, totNumberModules, totNumberConnections)
  mergeExistingContainerAM(newModules, newConnections)
  dispatch(mergeContainer(modIDConverter[containerID], newModules, newConnections, parentID, row, col))
}

export function duplicateContainer(dispatch: Dispatch, state: RootState, parentID: string, containerID: string, row: number, col: number) {
  const { modules, connections } = getContainerModulesConnections(state, containerID)
  const totNumberModules = Object.keys(state.modules).length
  const totNumberConnections = Object.keys(state.connections).length
  performContainerMerge(dispatch, modules, connections, totNumberModules, totNumberConnections, parentID, containerID, row, col)
}

export function loadSavedContainer(dispatch: Dispatch, name: string, totNumberModules: number, totNumberConnections: number, parentID: string, row: number, col: number) {
  window.containerSaveService.get(name).then(({ containerID, modules, connections }: any) => {
    performContainerMerge(dispatch, modules, connections, totNumberModules, totNumberConnections, parentID, containerID, row, col)
  })
}

export function loadProjectAsContainer(dispatch: Dispatch, currState: RootState, parentID: string, row: number, col: number, stateToRestore: RootState) {
  // used for loading in projects as containers within an existing project
  const { modules, connections, baseContainerID } = stateToRestore
  const totNumberModules = Object.keys(currState.modules).length
  const totNumberConnections = Object.keys(currState.connections).length
  const { newModules, newConnections } = getReplicatedState(modules, connections, totNumberModules, totNumberConnections)
  const goodNewModules = {
    ...newModules,
    [baseContainerID]: {
      ...newModules[baseContainerID],
      isBaseContainer: false,
      parentID,
    }
  }
  dispatch(mergeContainer(baseContainerID, goodNewModules, newConnections, parentID, row, col))
}