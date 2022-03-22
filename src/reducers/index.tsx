import { combineReducers } from "redux";
import { auth } from './auth/state'
import { setting } from './setting/state'

export default () => combineReducers({
    auth: auth,
    setting: setting
})