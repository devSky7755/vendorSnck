export const SET_VENUES = 'VENUE/SET';
export const PATCH_VENUE = 'VENUE/PATCH';
export const SET_VENDOR_STAND = 'VENUE/SET_VENDOR';

export function setVenues(venues) {
    return dispatch => {
        dispatch({
            type: SET_VENUES,
            payload: venues
        })
    }
}

export function patchVenue(venue, key, value) {
    return dispatch => {
        dispatch({
            type: PATCH_VENUE,
            venue: venue,
            key: key,
            value: value
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