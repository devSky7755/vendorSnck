export const LOGIN = 'AUTH/LOGIN';
export const LOGOUT = 'AUTH/LOGOUT';


export function login(token, attribute) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            token: token,
            attribute: attribute
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