import { ApiResponse } from "src/models/api_response";
import { BASE_URL, isVendorApp } from "src/models/constant";
import { MenuItem } from "src/models/menu_item";
import { VendorStand } from "src/models/vendorStand";
import { Venue } from "src/models/venue";

const VerifyEndPoint = isVendorApp ? 'auth/staff/verification-code' : 'auth/admin/verification-code';
const AuthEndPoint = isVendorApp ? 'auth/staff/login' : 'auth/admin/login';
const VenuesEndpoint = 'venues';
const VendorStandEndpoint = 'vendorStands/'


///Authentication
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

///Venues
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
    return fetch(BASE_URL + VenuesEndpoint + '/' + id).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return null;
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
        if (res.success) {
            return res.data as Venue;
        } else {
            return null;
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
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}


///Vendor Stand
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

export function postVendorStand(token: string, vendor: VendorStand): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vendor)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return null;
        }
    })
}

export function deleteVendorStand(token: string, id: string): Promise<boolean> {
    return fetch(BASE_URL + VendorStandEndpoint + '/' + id, {
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

//Menu Items

export function patchMenuItem(token: string, vendorId: string, menu: MenuItem, patch): Promise<MenuItem> {
    return fetch(BASE_URL + VendorStandEndpoint + vendorId + '/menuItems/' + menu.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as MenuItem;
        } else {
            return menu;
        }
    })
}

export function postMenuItem(token: string, vendorId: string, menu: MenuItem): Promise<MenuItem> {
    return fetch(BASE_URL + VendorStandEndpoint + vendorId + '/menuItems', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(menu)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as MenuItem;
        } else {
            return null;
        }
    })
}

export function deleteMenuItem(token: string, menu: MenuItem): Promise<boolean> {
    return fetch(BASE_URL + VendorStandEndpoint + menu.vendorStandId + '/menuItems/' + menu.id, {
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
