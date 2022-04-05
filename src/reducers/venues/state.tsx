import { Venue } from 'src/models/venue';
import { SET_VENUES } from './action';

interface VenueState {
    venues?: Venue[];
}

const authInitState: VenueState = {
    venues: null,
};

export const auth = (state = authInitState, action) => {
    switch (action.type) {
        case SET_VENUES:
            return {
                venues: action.payload
            }
        default:
            return state;
    }
};