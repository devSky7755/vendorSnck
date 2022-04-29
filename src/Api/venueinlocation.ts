import { BASE_URL } from "src/models/constant";
import { VenueInLocation } from "src/models/venue";

const VenuesEndpoint = 'venues/';

export function getVenueVenueInLocations(token, venueId): Promise<VenueInLocation[]> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.inVenueLocations as VenueInLocation[];
        } else {
            return null;
        }
    })
}

export function patchVenueInLocation(token: string, venueId: string, item: VenueInLocation, patch): Promise<VenueInLocation> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations/' + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueInLocation;
        } else {
            return item;
        }
    })
}

export function postVenueInLocation(token: string, venueId: string, item: VenueInLocation): Promise<VenueInLocation> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueInLocation;
        } else {
            return null;
        }
    })
}

export function deleteVenueInLocation(token: string, venueId: string, item: VenueInLocation): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations/' + item.id, {
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