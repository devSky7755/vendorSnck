export const LOGIN = 'AUTH/LOGIN';
export const LOGOUT = 'AUTH/LOGOUT';
export const SET_PHONE = 'AUTH/SET_PHONE';

export function setPhone(phone) {
    return dispatch => {
        dispatch({
            type: SET_PHONE,
            payload: phone
        })
    }
}

export function login(auth) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: auth
        })
    }
}

export function logout() {
    return dispatch => {
        dispatch({
            type: LOGOUT
        })
    }
}