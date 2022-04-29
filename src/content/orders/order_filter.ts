import { OrderStatus, OrderType } from "src/models/order";

export interface OrderFilter {
    type: OrderType[];
    status: OrderStatus[];
    search: string;
    menuIds: string[];
}

export const defaultFilter: OrderFilter = {
    type: ['Delivery', 'Pickup'],
    status: ['New', 'Preparing', 'Ready', 'Delivering', 'Waitlist', 'Completed', 'Cancelled'],
    search: '',
    menuIds: []
}