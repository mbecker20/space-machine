import { Modules, Connections, ContainerModule } from "./stateTSTypes"
import { ObjFrom2Arrays } from "./helpers"
import { stringIn } from "../helpers/genFuncs"
import { CONTAINER } from "../audioModules/moduleTypes"
import { Dispatch } from 'redux'


function genRandomID(index: number, totNumber: number) {
  return `${totNumber}${index}`
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

function replicateContainer(dispatch: Dispatch, modules: Modules, connections: Connections, totNumberModules: number, totNumberConnections: number) {
  // this function makes a copy of state with above function, then restores all modules and connections,
  // and dispatches an action to merge the copied state with the full project state 
  const { newModules, newConnections } = getReplicatedState(modules, connections, totNumberModules, totNumberConnections)
}

export default replicateContainer