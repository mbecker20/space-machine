import { combineReducers } from 'redux'
import cmReducer from './containerModules/cmReducer'

const rootReducer = combineReducers({
  containerModules: cmReducer,
})

export default rootReducer
