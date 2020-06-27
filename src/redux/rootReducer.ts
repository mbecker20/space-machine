import { combineReducers } from 'redux'
import cmReducer from './containerModules/cmReducer'
import bcidReducer from './baseContainerID/bcidReducer'

const rootReducer = combineReducers({
  containerModules: cmReducer,
  baseContainerID: bcidReducer,
})

export default rootReducer
