import { BASE_URL } from "src/models/constant";
import { Promo } from "src/models/promo";

const PromosEndpoint = 'promos/';

export function getPromos(token): Promise<Promo[]> {
    return fetch(BASE_URL + PromosEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.promos as Promo[];
        } else {
            return null;
        }
    })
}

export function patchPromo(token: string, item: Promo, patch): Promise<Promo> {
    return fetch(BASE_URL + PromosEndpoint + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Promo;
        } else {
            return null;
        }
    })
}

export function postPromo(token: string, item: Promo): Promise<Promo> {
    return fetch(BASE_URL + PromosEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Promo;
        } else {
            return null;
        }
    })
}

export function deletePromo(token: string, item: Promo): Promise<boolean> {
    return fetch(BASE_URL + PromosEndpoint + item.id, {
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