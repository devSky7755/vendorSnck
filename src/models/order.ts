import { Customer } from "./customer";
import { MenuItem, tempMenus } from "./menu_item";
import { TeamUser, tempUsers } from "./team_user";

export type OrderType = 'Delivery' | 'Pickup';
export type OrderStatus = 'Preparing' | 'Ready' | 'Delivering' | 'Completed' | 'Issued'

export interface Order {
    id: number;
    order_type: OrderType;
    item_count: number;
    items: MenuItem[];
    status: OrderStatus;
    created: number;
    duetime: number;
    user_notified?: number;
    customer: Customer;
    delivery?: TeamUser;
}

export const temp_orders: Order[] = [
    {
        id: 567,
        item_count: 4,
        order_type: 'Delivery',
        status: 'Preparing',
        created: Date.now() - 15 * 60 * 1000,
        items: [
            tempMenus[0],
            tempMenus[1],
            tempMenus[1],
            tempMenus[2]
        ],
        duetime: Date.now() - 2 * 60 * 1000,
        customer: {
            name: 'Jack Jackson',
            seat: 'Seat 1 | Row B | Section B'
        },
        delivery: tempUsers[1]
    },
    {
        id: 568,
        item_count: 2,
        order_type: 'Pickup',
        status: 'Preparing',
        created: Date.now() - 13.2 * 60 * 1000,
        user_notified: Date.now() - 5.6 * 60 * 1000,
        items: [
            tempMenus[0],
            tempMenus[1]
        ],
        duetime: Date.now() - 3.2 * 60 * 1000,
        customer: {
            name: 'Peter Peterson',
        },
    },
    {
        id: 569,
        item_count: 2,
        order_type: 'Delivery',
        status: 'Ready',
        created: Date.now() - 7 * 60 * 1000,
        items: [
            tempMenus[0],
            tempMenus[1]
        ],
        duetime: Date.now() + 13.2 * 60 * 1000,
        customer: {
            name: 'David Daveson',
            seat: 'Seat 2 | Row C | Section D'
        },
        delivery: tempUsers[0]
    },
    {
        id: 570,
        item_count: 1,
        order_type: 'Delivery',
        status: 'Ready',
        created: Date.now() - 7.3 * 60 * 1000,
        items: [
            tempMenus[3]
        ],
        duetime: Date.now() + 12.2 * 60 * 1000,
        customer: {
            name: 'Derek Derekson',
        },
    },
    {
        id: 571,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Preparing',
        created: Date.now() - 7.6 * 60 * 1000,
        user_notified: Date.now() - 3.6 * 60 * 1000,
        items: [
            tempMenus[4]
        ],
        duetime: Date.now() + 14.8 * 60 * 1000,
        customer: {
            name: 'Janet Janetson',
        },
    },
    {
        id: 572,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            tempMenus[3]
        ],
        duetime: Date.now() + 22.8 * 60 * 1000,
        customer: {
            name: 'Derek Derekson',
        },
    },
    {
        id: 573,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            tempMenus[4]
        ],
        duetime: Date.now() + 23.8 * 60 * 1000,
        customer: {
            name: 'Janet Janetson',
        },
    }
];