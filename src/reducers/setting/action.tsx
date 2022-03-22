export const SET_SIDEBAR = 'SETTING/SET_SIDEBAR';
export const TOGGLE_SIDEBAR = 'SETTING/TOGGLE_SIDEBAR';
export const RESET = 'SETTING/RESET';


export function toggleSidebar() {
    return dispatch => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    }
}

export function setSidebar(showSidebar) {
    return dispatch => {
        dispatch({
            type: SET_SIDEBAR,
            payload: showSidebar
        })
    }
}

export function reset() {
    return dispatch => {
        dispatch({
            type: RESET
        })
    }
}