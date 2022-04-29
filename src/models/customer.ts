import { Order } from "./order";

export interface Customer {
    id?: string;
    firstName: string;
    lastName: string;
    status?: string;
    geoLocation?: string;
    stripeId?: string;
    inVenueLocationUpdatedAt?: Date;
    tempBlocked?: boolean;
    permBlocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    inVenueLocationId?: string;
    mobileNo?: string;
    note?: string;
    orders?: Order[]
}
