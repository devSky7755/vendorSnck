import { Customer } from "./customer";
import { MenuItemV1, tempMenus } from "./menu_item";
import { Staff, tempStaffs } from "./staff";

export type OrderType = 'Delivery' | 'Pickup';
export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Delivering' | 'Waitlist' | 'Completed' | 'Issued'

export interface Order {
    id: number;
    order_type: OrderType;
    item_count: number;
    items: MenuItemV1[];
    status: OrderStatus;
    created: number;
    duetime: number;
    user_notified?: number;
    dispatch_time?: number;
    customer: Customer;
    delivery_person?: Staff;
}

export const temp_orders: Order[] = [
    {
        id: 567,
        item_count: 4,
        order_type: 'Delivery',
        status: 'New',
        created: Date.now() - 15 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 2 },
            { ...tempMenus[2], count: 1 },
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() - 2 * 60 * 1000,
        customer: {
            firstName: 'Jack',
            lastName: 'Jackson',
            inVenueLocationId: 'Seat 1 | Row B | Section B'
        }
    },
    {
        id: 568,
        item_count: 2,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 13.2 * 60 * 1000,
        user_notified: Date.now() - 5.6 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 3 },
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() - 3.2 * 60 * 1000,
        customer: {
            firstName: 'Peter',
            lastName: 'Peterson'
        },
    },
    {
        id: 569,
        item_count: 2,
        order_type: 'Delivery',
        status: 'New',
        created: Date.now() - 7 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 2 },
            { ...tempMenus[3], count: 4 },
        ],
        duetime: Date.now() + 13.2 * 60 * 1000,
        customer: {
            firstName: 'David',
            lastName: 'Daveson',
            inVenueLocationId: 'Seat 2 | Row C | Section D'
        },
    },
    {
        id: 570,
        item_count: 1,
        order_type: 'Delivery',
        status: 'New',
        created: Date.now() - 7.3 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 2 },
            { ...tempMenus[4], count: 1 },
        ],
        duetime: Date.now() + 12.2 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
    },
    {
        id: 671,
        item_count: 1,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 7.6 * 60 * 1000,
        user_notified: Date.now() - 3.6 * 60 * 1000,
        items: [
            { ...tempMenus[4], count: 3 },
        ],
        duetime: Date.now() + 14.8 * 60 * 1000,
        customer: {
            firstName: 'Janet',
            lastName: 'Janetson'
        },
    },
    {
        id: 572,
        item_count: 1,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() + 22.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
        },
    },
    {
        id: 573,
        item_count: 1,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() + 23.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
        },
    },

    /*preparing*/
    {
        id: 567,
        item_count: 4,
        order_type: 'Delivery',
        status: 'Preparing',
        created: Date.now() - 15 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 2 },
            { ...tempMenus[4], count: 3 },
            { ...tempMenus[2], count: 1 },
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() - 2 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
            inVenueLocationId: 'Seat 1 | Row B | Section B'
        },
    },
    {
        id: 568,
        item_count: 2,
        order_type: 'Pickup',
        status: 'Preparing',
        created: Date.now() - 13.2 * 60 * 1000,
        user_notified: Date.now() - 5.6 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 3 },
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() - 3.2 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
        },
    },
    {
        id: 569,
        item_count: 2,
        order_type: 'Delivery',
        status: 'Preparing',
        created: Date.now() - 7 * 60 * 1000,
        items: [
            { ...tempMenus[2], count: 2 },
            { ...tempMenus[3], count: 4 },
        ],
        duetime: Date.now() + 13.2 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
            inVenueLocationId: 'Seat 2 | Row C | Section D'
        },
    },
    {
        id: 570,
        item_count: 1,
        order_type: 'Delivery',
        status: 'Preparing',
        created: Date.now() - 7.3 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 2 },
            { ...tempMenus[1], count: 1 },
        ],
        duetime: Date.now() + 12.2 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
        },
    },
    /* ready */
    {
        id: 771,
        item_count: 1,
        order_type: 'Delivery',
        status: 'Ready',
        created: Date.now() - 7.6 * 60 * 1000,
        user_notified: Date.now() - 3.6 * 60 * 1000,
        items: [
            { ...tempMenus[2], count: 3 },
        ],
        duetime: Date.now() + 14.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson',
        },
    },
    {
        id: 471,
        item_count: 1,
        order_type: 'Delivery',
        status: 'Ready',
        created: Date.now() - 7.6 * 60 * 1000,
        user_notified: Date.now() - 3.6 * 60 * 1000,
        items: [
            { ...tempMenus[2], count: 3 },
        ],
        duetime: Date.now() - 1.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
    },
    {
        id: 572,
        item_count: 1,
        order_type: 'Delivery',
        status: 'Delivering',
        dispatch_time: Date.now() - 12.6 * 60 * 1000,
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() + 22.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
        delivery_person: tempStaffs[0]
    },
    {
        id: 573,
        item_count: 1,
        order_type: 'Delivery',
        status: 'Delivering',
        dispatch_time: Date.now() - 2.6 * 60 * 1000,
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() + 23.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
        delivery_person: tempStaffs[1]
    },
    {
        id: 571,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: Date.now() - 7.6 * 60 * 1000,
        user_notified: Date.now() - 5 * 60 * 1000,
        items: [
            { ...tempMenus[2], count: 3 },
        ],
        duetime: Date.now() + 14.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
    },
    {
        id: 591,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Ready',
        created: Date.now() - 7.6 * 60 * 1000,
        user_notified: Date.now() - 3.6 * 60 * 1000,
        items: [
            { ...tempMenus[2], count: 3 },
        ],
        duetime: Date.now() - 1.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
    },
    {
        id: 572,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Waitlist',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() + 22.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
    },
    {
        id: 573,
        item_count: 1,
        order_type: 'Pickup',
        status: 'Waitlist',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() + 23.8 * 60 * 1000,
        customer: {
            firstName: 'Derek',
            lastName: 'Derekson'
        },
    }
];