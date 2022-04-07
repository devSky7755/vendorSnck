import { VendorStand } from 'src/models/vendor_stand';
import { Venue } from 'src/models/venue';
import { PATCH_VENUE, SET_VENDOR_STAND, SET_VENUES } from './action';

interface VenueState {
    venues?: Venue[];
    vendorStand?: VendorStand;
}

const venuesInitialState: VenueState = {
    venues: null,
    vendorStand: null
};

export const venues = (state = venuesInitialState, action) => {
    let new_venues = null;
    let new_venue = null;

    switch (action.type) {
        case SET_VENUES:
            return {
                ...state,
                venues: action.payload
            }
        case PATCH_VENUE:
            new_venue = {
                ...action.venue
            }
            new_venue[action.key] = action.value;
            let new_venues = [...state.venues];
            const index = new_venues.findIndex(x => x.id === new_venue.id);
            if (index >= 0) {
                new_venues[index] = new_venue;
            }
            return {
                ...state,
                venues: new_venues
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