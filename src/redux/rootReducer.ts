import { combineReducers } from 'redux'
import cmReducer from './modules/moduleReducer'
import bcidReducer from './baseContainerID/bcidReducer'

const rootReducer = combineReducers({
  containerModules: cmReducer,
  baseContainerID: bcidReducer,
})

export default rootReducer
