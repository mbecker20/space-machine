import { combineReducers } from 'redux'
import moduleReducer from './module/moduleReducer'

const rootReducer = combineReducers({
  module: moduleReducer,
})

export default rootReducer
