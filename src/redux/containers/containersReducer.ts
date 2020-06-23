import { Module, ContainerModule } from "../stateTSTypes"
import { ADD_CONTAINER } from './containersActionTypes'

const initState: ContainerModule = {
  id: 'empty',
  row: 0,
  col: 0,
  inputs: null,
  outputs: null,
  parent: null,
  childContainers: [],
  childModules: [],
  maxRow: 0,
  maxCol: 0,
  controls: {},
}

interface ContainersAction {
  type: string
  id: string
  parentID: string | null
  row: number
  col: number

}

const containersReducer = (state = {}, { type, id, row, col, parentID }: ContainersAction) => {
  switch(type) {
    case ADD_CONTAINER: return Object.assign({}, state, {
      id: {
        id,
        row,
        col,
        parentID,
        inputs: null,
        outputs: null,
        childContainers: [],
        childModules: [],
        maxRow: 0,
        maxCol: 0,
        controls: {},
      }
    })
      
    }
    default: return state
  }
}

export default containerReducer