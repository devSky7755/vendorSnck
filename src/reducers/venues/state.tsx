import { VendorStand } from 'src/models/vendorStand';
import { Venue } from 'src/models/venue';
import { DELETE_VENDOR, DELETE_VENUE, LOAD_VENDORS, PATCH_VENUE, SET_VENDOR_STAND, SET_VENUES, UPDATE_VENDOR, UPDATE_VENUE } from './action';

interface VenueState {
    //Admin App
    venues?: Venue[];
    vendorStands?: VendorStand[];

    //Vendor APP
    vendorStand?: VendorStand;
}

const venuesInitialState: VenueState = {
    venues: null,
    vendorStands: null,
    vendorStand: null
};

export const venues = (state = venuesInitialState, action) => {
    let new_venues = null;
    let new_vendors = null;
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
        case LOAD_VENDORS:
            return {
                ...state,
                vendorStands: action.vendors
            }
        case UPDATE_VENDOR:
            new_vendors = [...state.vendorStands];
            index = new_vendors.findIndex(x => x.id === action.vendor.id);
            if (index >= 0) {
                new_vendors[index] = action.vendor;
            } else {
                new_vendors.push(action.vendor);
            }
            return {
                ...state,
                vendorStands: new_vendors
            }
        case DELETE_VENDOR:
            new_vendors = state.vendorStands.filter(x => x.id !== action.vendor.id);
            return {
                ...state,
                vendorStands: new_vendors
            }
        default:
            return state;
    }
};