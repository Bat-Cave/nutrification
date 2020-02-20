import {createStore, combineReducers} from 'redux';
import reducer from './reducer'
import userReducer from './userReducer';

const rootReducer = combineReducers({
  reducer,
  userReducer
})

export default createStore(rootReducer)