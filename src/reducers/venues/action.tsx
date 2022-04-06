export const SET_VENUES = 'VENUE/SET';
export const SET_VENDOR_STAND = 'VENUE/SET_VENDOR';

export function setVenues(venues) {
    return dispatch => {
        dispatch({
            type: SET_VENUES,
            payload: venues
        })
    }
}

export function setVendorStand(vendorStand) {
    return dispatch => {
        dispatch({
            type: SET_VENDOR_STAND,
            payload: vendorStand
        })
    }
}