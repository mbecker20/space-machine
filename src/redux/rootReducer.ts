import { combineReducers } from 'redux'
import cmReducer from './containerModules/cmReducer'
import fcReducer from './fillContainer/fcReducer'
import bcidReducer from './baseContainerID/bcidReducer'

const rootReducer = combineReducers({
  containerModules: cmReducer,
  fillContainer: fcReducer,
  baseContainerID: bcidReducer,
})

export default rootReducer
