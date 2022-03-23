export const SET_SIDEBAR = 'SETTING/SET_SIDEBAR';
export const TOGGLE_SIDEBAR = 'SETTING/TOGGLE_SIDEBAR';
export const RESET = 'SETTING/RESET';
export const PAUSE = 'SETTING/RESET';
export const REFRESH_PAUSE = 'SETTING/REFRESH_PAUSE';

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

export function pauseFor(minute) {
    return dispatch => {
        dispatch({
            type: PAUSE,
            payload: minute
        })
    }
}

export function refreshPause() {
    return dispatch => {
        dispatch({
            type: REFRESH_PAUSE
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