import { combineReducers } from "redux";
import { auth } from './auth/state'
import { setting } from './setting/state'
import { venues } from './venues/state'

export default () => combineReducers({
    auth: auth,
    setting: setting,
    venues: venues
})