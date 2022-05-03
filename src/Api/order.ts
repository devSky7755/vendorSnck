import { BASE_URL } from "src/models/constant";
import { Order } from "src/models/order";

const OrdersEndpoint = 'orders/';

export function getOrders(token): Promise<Order[]> {
    return fetch(BASE_URL + OrdersEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.orders as Order[];
        } else {
            return null;
        }
    })
}