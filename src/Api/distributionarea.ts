import { BASE_URL } from "src/models/constant";
import { VenueDistributionArea } from "src/models/venue";

const VenuesEndpoint = 'venues/';

export function getVenueDistributionAreas(token, venueId): Promise<VenueDistributionArea[]> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.distributionAreas as VenueDistributionArea[];
        } else {
            return null;
        }
    })
}

export function patchVenueDistributionArea(token: string, venueId: string, item: VenueDistributionArea, patch): Promise<VenueDistributionArea> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas/' + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueDistributionArea;
        } else {
            return item;
        }
    })
}

export function postVenueDistributionArea(token: string, venueId: string, item: VenueDistributionArea): Promise<VenueDistributionArea> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueDistributionArea;
        } else {
            return null;
        }
    })
}

export function deleteVenueDistributionArea(token: string, venueId: string, item: VenueDistributionArea): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas/' + item.id, {
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
