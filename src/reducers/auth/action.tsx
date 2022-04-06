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

export function login(token, data) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            token: token,
            data: data
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