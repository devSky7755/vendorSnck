export const SET_VENUES = 'VENUE/SET';

export function setVenues(venues) {
    return dispatch => {
        dispatch({
            type: SET_VENUES,
            payload: venues
        })
    }
}
