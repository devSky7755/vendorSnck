import { ApiResponse } from "src/models/api_response";
import { BASE_URL, isVendorApp } from "src/models/constant";
import { VendorStand } from "src/models/vendor_stand";
import { Venue } from "src/models/venue";

const AuthEndPoint = isVendorApp ? 'auth/staff/login' : 'auth/admin/login';
const VerifyEndPoint = isVendorApp ? 'auth/staff/verification-code' : 'auth/admin/verification-code';
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

export function getVendorStand(id): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint + id).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return null;
        }
    })
}
