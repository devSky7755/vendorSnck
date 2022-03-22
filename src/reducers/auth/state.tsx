import { Admin } from 'src/models/admin';
import { LOGIN, LOGOUT, SET_PHONE } from './action';

interface AuthState {
    token: string;
    admin: Admin;
    lastLoggedIn: Date;
}

const authInitState: AuthState = {
    token: null,
    admin: null,
    lastLoggedIn: null
};

export const auth = (state = authInitState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...action.payload,
                lastLoggedIn: new Date()
            }
        case LOGOUT:
            return authInitState;
        case SET_PHONE:
            let newAdmin = state.admin;
            if (!newAdmin) {
                newAdmin = {
                    id: null,
                    mobileNo: action.payload
                }
            } else {
                newAdmin.mobileNo = action.payload;
            }
            return {
                ...state,
                admin: { ...newAdmin }
            }
        default:
            return state;
    }
};