import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import moduleReducer from './module/moduleReducer'

const store = createStore(moduleReducer, composeWithDevTools(applyMiddleware(logger)))

export default store