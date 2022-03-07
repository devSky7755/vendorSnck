import { LOGIN, LOGOUT } from './action';

const authInitState = {
    token: null,
    attribute: null
};


export const auth = (state = authInitState, action) => {

    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                attribute: action.attribute
            }
        case LOGOUT:
            return authInitState;
        default:
            return state;
    }
};