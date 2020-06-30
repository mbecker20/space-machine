import { combineReducers } from 'redux'
import moduleReducer from './modules/moduleReducer'
import bcidReducer from './baseContainerID/bcidReducer'

const rootReducer = combineReducers({
  modules: moduleReducer,
  baseContainerID: bcidReducer,
})

export default rootReducer
