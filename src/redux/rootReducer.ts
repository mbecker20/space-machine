import { combineReducers } from 'redux'
import containerReducer from './containers/containersReducer'

const rootReducer = combineReducers({
  containers: containerReducer,
})

export default rootReducer
