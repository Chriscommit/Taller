import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
