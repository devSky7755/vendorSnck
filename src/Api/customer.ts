import { BASE_URL } from "src/models/constant";
import { BulkPatchCustomer, Customer } from "src/models/customer";

const CustomersEndpoint = 'customers/';

export function getCustomers(token): Promise<Customer[]> {
    return fetch(BASE_URL + CustomersEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.customers as Customer[];
        } else {
            return null;
        }
    })
}

export function patchCustomer(token: string, item: Customer, patch): Promise<Customer> {
    return fetch(BASE_URL + CustomersEndpoint + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Customer;
        } else {
            return null;
        }
    })
}

export function patchCustomers(token: string, ids: string[], data: BulkPatchCustomer): Promise<Customer[]> {
    return fetch(BASE_URL + CustomersEndpoint, {
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
            return res.data as Customer[];
        } else {
            return [];
        }
    })
}

export function deleteCustomer(token: string, item: Customer): Promise<boolean> {
    return fetch(BASE_URL + CustomersEndpoint + item.id, {
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

export function deleteCustomers(token: string, ids: string[]): Promise<boolean> {
    return fetch(BASE_URL + CustomersEndpoint + 'delete', {
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
