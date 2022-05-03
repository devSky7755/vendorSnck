import { BASE_URL } from "src/models/constant";
import { BulkPatchStaff, Staff } from "src/models/staff";

const StaffsEndpoint = 'staffs/';

export function getAllStaffs(token: string): Promise<Staff[]> {
    return fetch(BASE_URL + StaffsEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(res => res.json()).then(res => {
        if (res.success && res.data && res.data.staffs) {
            return res.data.staffs as Staff[];
        } else {
            return [];
        }
    })
}

export function patchStaff(token: string, staff: Staff, patch): Promise<Staff> {
    return fetch(BASE_URL + StaffsEndpoint + staff.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Staff;
        } else {
            return staff;
        }
    })
}

export function patchStaffs(token: string, ids: string[], data: BulkPatchStaff): Promise<Staff[]> {
    return fetch(BASE_URL + StaffsEndpoint, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ids,
            data
        })
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Staff[];
        } else {
            return [];
        }
    })
}

export function postStaff(token: string, staff: Staff): Promise<Staff> {
    return fetch(BASE_URL + StaffsEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(staff)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Staff;
        } else {
            return null;
        }
    })
}

export function deleteStaff(token: string, staff: Staff): Promise<boolean> {
    return fetch(BASE_URL + StaffsEndpoint + staff.id, {
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

export function deleteStaffs(token: string, ids: string[]): Promise<boolean> {
    return fetch(BASE_URL + StaffsEndpoint + 'delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}