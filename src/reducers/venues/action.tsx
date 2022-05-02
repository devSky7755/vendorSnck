export const SET_VENUES = 'VENUE/SET';
export const PATCH_VENUE = 'VENUE/PATCH';
export const UPDATE_VENUE = 'VENUE/UPDATE';
export const DELETE_VENUE = 'VENUE/DELETE';

export const LOAD_VENDORS = 'VENDOR/SET';
export const UPDATE_VENDOR = 'VENDOR/UPDATE';
export const DELETE_VENDOR = 'VENDOR/DELETE';

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

export function updateVenue(venue) {
    return dispatch => {
        dispatch({
            type: UPDATE_VENUE,
            venue: venue,
        })
    }
}

export function deleteVenue(venue) {
    return dispatch => {
        dispatch({
            type: DELETE_VENUE,
            venue: venue,
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

export function loadVendors(vendors) {
    return dispatch => {
        dispatch({
            type: LOAD_VENDORS,
            vendors: vendors
        })
    } 
}

export function updateVendor(vendor) {
    return dispatch => {
        dispatch({
            type: UPDATE_VENDOR,
            vendor: vendor,
        })
    }
}

export function deleteVendor(vendor) {
    return dispatch => {
        dispatch({
            type: DELETE_VENDOR,
            vendor: vendor,
        })
    }
}