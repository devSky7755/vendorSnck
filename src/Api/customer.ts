import { BASE_URL } from "src/models/constant";
import { Customer } from "src/models/customer";

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
