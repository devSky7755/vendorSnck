import { Customer } from "./customer";
import { MenuItem, tempMenus } from "./menu_item";
import { TeamUser } from "./team_user";

export type OrderType = 'Delivery' | 'Pickup';
export type OrderStatus = 'Preparing' | 'Ready' | 'Delivering' | 'Completed' | 'Issued'

export interface Order {
    id: number;
    item_count: number;
    order_type: OrderType;
    status: OrderStatus;
    created: number;
    items: MenuItem[];
    waiting: number;
    due_time: number;
    customer: Customer;
    delivery?: TeamUser;
}

export const temp_orders_new: Order[] = [
    {
        id: 567,
        item_count: 4,
        order_type: 'Delivery',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[0],
            tempMenus[1],
            tempMenus[1],
            tempMenus[2]
        ],
        waiting: 900,
        due_time: 100,
        customer: {
            name: 'Jack Jackson',
            seat: 'Seat 1 | Row B | Section B'
        },
    },
    {
        id: 568,
        item_count: 2,
        order_type: 'Pickup',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[0],
            tempMenus[1]
        ],
        waiting: 13 * 60,
        due_time: 200,
        customer: {
            name: 'Peter Peterson',
        },
    },
    {
        id: 569,
        item_count: 2,
        order_type: 'Delivery',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[0],
            tempMenus[1]
        ],
        waiting: 7 * 60,
        due_time: 400,
        customer: {
            name: 'David Daveson',
            seat: 'Seat 2 | Row C | Section D'
        },
    },
    {
        id: 570,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[3]
        ],
        waiting: 7 * 60,
        due_time: 500,
        customer: {
            name: 'Derek Derekson',
        },
    },
    {
        id: 571,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[4]
        ],
        waiting: 7 * 60,
        due_time: 600,
        customer: {
            name: 'Janet Janetson',
        },
    },
    {
        id: 572,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[3]
        ],
        waiting: 7 * 60,
        due_time: 1000,
        customer: {
            name: 'Derek Derekson',
        },
    },
    {
        id: 573,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: 0,
        items: [
            tempMenus[4]
        ],
        waiting: 7 * 60,
        due_time: 1000,
        customer: {
            name: 'Janet Janetson',
        },
    }
];