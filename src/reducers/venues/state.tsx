import { VendorStand } from 'src/models/vendorStand';
import { Venue } from 'src/models/venue';
import { DELETE_VENUE, PATCH_VENUE, SET_VENDOR_STAND, SET_VENUES, UPDATE_VENUE } from './action';

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
    let index = 0;

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
            new_venues = [...state.venues];
            index = new_venues.findIndex(x => x.id === new_venue.id);
            if (index >= 0) {
                new_venues[index] = new_venue;
            }
            return {
                ...state,
                venues: new_venues
            }
        case UPDATE_VENUE:
            new_venues = [...state.venues];
            index = new_venues.findIndex(x => x.id === action.venue.id);
            if (index >= 0) {
                new_venues[index] = action.venue;
            } else {
                new_venues.push(action.venue);
            }
            return {
                ...state,
                venues: new_venues
            }
        case DELETE_VENUE:
            new_venues = state.venues.filter(x => x.id !== action.venue.id);
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