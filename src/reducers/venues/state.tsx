import { VendorStand } from 'src/models/vendor_stand';
import { Venue } from 'src/models/venue';
import { SET_VENDOR_STAND, SET_VENUES } from './action';

interface VenueState {
    venues?: Venue[];
    vendorStand?: VendorStand;
}

const venuesInitialState: VenueState = {
    venues: null,
    vendorStand: null
};

export const venues = (state = venuesInitialState, action) => {
    switch (action.type) {
        case SET_VENUES:
            return {
                ...state,
                venues: action.payload
            }
        case SET_VENDOR_STAND:
            return {
                ...state,
                vendorStand: action.payload
            }
        default:
            return state;
    }
};