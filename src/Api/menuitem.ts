import { BASE_URL } from "src/models/constant";
import { MenuItem } from "src/models/menu_item";

const VendorStandEndpoint = 'vendorStands/';
const MenuItemsEndpoint = 'menuItems/';

export function getMenuItems(token: string): Promise<MenuItem[]> {
    return fetch(BASE_URL + MenuItemsEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.menuItems as MenuItem[];
        } else {
            return [];
        }
    })
}

export function patchBulkMenuItems(token, patch): Promise<MenuItem[]> {
    return fetch(BASE_URL + MenuItemsEndpoint, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as MenuItem[];
        } else {
            return [];
        }
    }).catch(ex => {
        return [];
    })
}

export function deleteBulkMenuItems(token: string, data): Promise<boolean> {
    return fetch(BASE_URL + MenuItemsEndpoint + 'delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(res => {
        return res.success;
    }).catch(ex => {
        return false;
    })
}

export function patchMenuItem(token: string, menu: MenuItem, patch): Promise<MenuItem> {
    return fetch(BASE_URL + VendorStandEndpoint + menu.vendorStandId + '/menuItems/' + menu.id, {
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

export function postMenuItem(token: string, menu: MenuItem): Promise<MenuItem> {
    return fetch(BASE_URL + VendorStandEndpoint + menu.vendorStandId + '/menuItems', {
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