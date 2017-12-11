import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import reduxPromiseMiddleware from 'redux-promise-middleware'

import reducer from './reducer'

// const reducer = combineReducers({
//   page1: page1;
// })

const store = createStore(reducer,
  applyMiddleware(reduxPromiseMiddleware())
)
export default store
