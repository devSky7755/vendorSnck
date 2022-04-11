import { ClassNames } from "@emotion/react";
import { ApiResponse } from "src/models/api_response";
import { BASE_URL, isVendorApp } from "src/models/constant";
import { VendorStand } from "src/models/vendorStand";
import { Venue } from "src/models/venue";

const VerifyEndPoint = isVendorApp ? 'auth/staff/verification-code' : 'auth/admin/verification-code';
const AuthEndPoint = isVendorApp ? 'auth/staff/login' : 'auth/admin/login';
const VenuesEndpoint = 'venues';
const VendorStandEndpoint = 'vendorStands/'

export function postAuthentication(phone: string): Promise<ApiResponse> {
    return fetch(BASE_URL + VerifyEndPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNo: phone })
    }).then(res => res.json()).then(res => {
        return res as ApiResponse;
    })
}

export function postLogin(phone: string, code: string): Promise<ApiResponse> {
    return fetch(BASE_URL + AuthEndPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNo: phone, code: code })
    }).then(res => res.json()).then(res => {
        return res as ApiResponse;
    })
}

export function getVenues(): Promise<Venue[]> {
    return fetch(BASE_URL + VenuesEndpoint).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data.venues as Venue[];
        } else {
            return [] as Venue[];
        }
    })
}

export function patchVenue(token: string, venue: Venue, patch): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint + '/' + venue.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        console.log('PATCH VENUE', res);
        if (res.success) {
            return res.data as Venue;
        } else {
            return venue;
        }
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
        console.log('POST VENUE', res);
        if (res.success) {
            return res.data as Venue;
        } else {
            return venue;
        }
    })
}

export function deleteVenue(token: string, id: string): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        console.log('DELETE VENUE', res);
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

export function getVendorStand(id): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint + id).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return null;
        }
    })
}

export function patchVendorStand(token: string, vendor: VendorStand, patch): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint + vendor.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return vendor;
        }
    })
}
