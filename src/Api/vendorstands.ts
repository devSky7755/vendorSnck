import { BASE_URL } from "src/models/constant";
import { VendorStand } from "src/models/vendorStand";

const VendorStandEndpoint = 'vendorStands/';

export function getVendorStands(token): Promise<VendorStand[]> {
    return fetch(BASE_URL + VendorStandEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.vendorStands as VendorStand[];
        } else {
            return null;
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