import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { auth } from './auth/state'

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: auth
})