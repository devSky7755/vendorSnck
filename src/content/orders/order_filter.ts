import { OrderStatus, OrderType } from "src/models/order";

export interface OrderFilter {
    type: OrderType[];
    status: OrderStatus[];
    search: string;
    menuIds: string[];
}

export const defaultFilter: OrderFilter = {
    type: ['delivery', 'pickup'],
    status: ['new', 'preparing', 'ready', 'delivering', 'waitlist', 'completed', 'cancelled'],
    search: '',
    menuIds: []
}