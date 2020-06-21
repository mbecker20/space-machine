import { createStore } from 'redux'
import moduleReducer from './module/moduleReducer'

const store = createStore(moduleReducer)

export default store