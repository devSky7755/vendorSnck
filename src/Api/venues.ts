import { BASE_URL } from "src/models/constant";
import { Venue } from "src/models/venue";

const VenuesEndpoint = 'venues/';

export function getVenues(): Promise<Venue[]> {
    return fetch(BASE_URL + VenuesEndpoint).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data.venues as Venue[];
        } else {
            return [] as Venue[];
        }
    })
}

export function getVenue(id: string): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint + id).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return null;
        }
    })
}

export function patchVenue(token: string, venue: Venue, patch): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint + venue.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return venue;
        }
    })
}

export function patchBulkVenueAPI(token: string, patch): Promise<Venue[]> {
    return fetch(BASE_URL + VenuesEndpoint, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue[];
        } else {
            return [];
        }
    }).catch(ex => {
        return [];
    })
}

export function postVenue(token: string, venue: Venue): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(venue)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return null;
        }
    })
}

export function deleteBulkVenuesAPI(token: string, data): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + 'delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        return res.success;
    }).catch(ex=>{
        return false;
    })
}

export function deleteVenue(token: string, id: string): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}