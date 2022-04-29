import { Customer } from "./customer";
import { MenuItemV1, tempMenus } from "./menu_item";
import { Staff, tempStaffs } from "./staff";

export type OrderType = 'Delivery' | 'Pickup';
export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Delivering' | 'Waitlist' | 'Completed' | 'Issued' | 'Cancelled'

export interface Order {
    id: number;
    order_type: OrderType;
    items: MenuItemV1[];
    status: OrderStatus;
    created: number;
    duetime: number;
    user_notified?: number;
    dispatch_time?: number;
    customer: Customer;
    delivery_person?: Staff;
}

export function GetOrderItemCount(order: Order) {
    if (!order || !order.items) return 0;
    let count = 0;
    order.items.forEach(item => {
        count += item.count;
    })
    return count;
}
export const temp_orders: Order[] = [
    {
        id: 567,
        order_type: 'Delivery',
        status: 'New',
        created: Date.now() - 15 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 2 },
            { ...tempMenus[2], count: 1 },
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() + 2 * 60 * 1000,
        customer: {
            firstName: 'Jack',
            lastName: 'Jackson',
            inVenueLocationId: 'Seat 1 | Row B | Section B'
        }
    },
    {
        id: 568,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 13.2 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 3 },
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() + 3.2 * 60 * 1000,
        customer: {
            firstName: 'Peter',
            lastName: 'Peterson'
        },
    },
    {
        id: 569,
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
        id: 571,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 7.6 * 60 * 1000,
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
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[3], count: 2 },
        ],
        duetime: Date.now() + 22.8 * 60 * 1000,
        customer: {
            firstName: 'BBB',
            lastName: 'BBBson',
        },
    },
    {
        id: 573,
        order_type: 'Pickup',
        status: 'New',
        created: Date.now() - 2.6 * 60 * 1000,
        items: [
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() + 23.8 * 60 * 1000,
        customer: {
            firstName: 'AAA',
            lastName: 'AAAson',
        },
    },

    /*preparing*/
    {
        id: 574,
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
        id: 575,
        order_type: 'Pickup',
        status: 'Preparing',
        created: Date.now() - 13.2 * 60 * 1000,
        items: [
            { ...tempMenus[0], count: 3 },
            { ...tempMenus[4], count: 2 },
        ],
        duetime: Date.now() - 3.2 * 60 * 1000,
        customer: {
            firstName: 'Peter',
            lastName: 'Peterson',
        },
    },
    {
        id: 576,
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
        id: 577,
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
        id: 578,
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
        id: 579,
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
        id: 580,
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
        id: 581,
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
        id: 582,
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
        id: 583,
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
        id: 584,
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
        id: 585,
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