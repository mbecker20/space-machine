import { combineReducers } from 'redux'
import cmReducer from './containerModules/cmReducer'
import fcidReducer from './fillContainerID/fcidReducer'
import bcidReducer from './baseContainerID/bcidReducer'

const rootReducer = combineReducers({
  containerModules: cmReducer,
  fillContainerID: fcidReducer,
  baseContainerID: bcidReducer,
})

export default rootReducer
