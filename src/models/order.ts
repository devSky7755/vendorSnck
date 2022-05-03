export type OrderType = 'delivery' | 'pickup';
export type OrderStatus = 'new' | 'preparing' | 'ready' | 'delivering' | 'waitlist' | 'completed' | 'cancelled'

export const OrderTypeOptions = [
    { label: 'Delivery', value: 'delivery' },
    { label: 'Pickup', value: 'pickup' }
];

export const OrderStatusOptions = [
    { label: 'New', value: 'new' },
    { label: 'Preparing', value: 'preparing' },
    { label: 'Ready', value: 'ready' },
    { label: 'Delivering', value: 'delivering' },
    { label: 'Waitlist', value: 'waitlist' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
];

export interface Order {
    id: string;
    distributionMethod: OrderType;
    cartItems: any[];
    status: OrderStatus;
    customer: {
        id: string;
        firstName: string;
        lastName: string;
    };
    totalPrice?: number;
    runnerStaffId?: string;
    runnerStaff?: {
        id: string;
        firstName: string;
        lastName: string;
    };
    inVenueLocation?: {
        id: string;
        hierarchy1: string;
        hierarchy2?: string;
        hierarchy3?: string;
    };
    dueAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    vendorStand?: {
        id: string;
        name: string;
    };
    
    dueTimestamp: number;
    created: number;
    user_notified?: number;
    dispatch_time?: number;
}

export function GetOrderIDLabel(value: string): string {
    return value.substring(0, 6).toUpperCase();
}

export function GetOrderDistributionLabel(value: string): string {
    var option = OrderTypeOptions.find(x => x.value === value);
    if (option) return option.label;
    return value;
}

export function GetOrderStatusLabel(value: string): string {
    var option = OrderStatusOptions.find(x => x.value === value);
    if (option) return option.label;
    return value;
}

export function GetOrderInVenueLocation(order: Order): string {
    if (!order.inVenueLocation) return '';
    var location = order.inVenueLocation.hierarchy1;
    if (order.inVenueLocation.hierarchy2) location = location + ' | ' + order.inVenueLocation.hierarchy2;
    if (order.inVenueLocation.hierarchy3) location = location + ' | ' + order.inVenueLocation.hierarchy3;
    return location;
}

export function GetOrderItemCount(order: Order) {
    if (!order || !order.cartItems) return 0;
    let count = 0;
    order.cartItems.forEach(item => {
        count += item.count || 1;
    })
    return count;
}