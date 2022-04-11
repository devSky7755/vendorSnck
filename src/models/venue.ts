import { VendorStand } from "./vendor_stand";

export interface Venue {
    id: string;
    active: boolean;
    name: string;
    address?: string;
    mapsUrl: string;
    coordinates: string;
    imageUrl?: string;
    seatingMapImageUrl?: string;
    primaryContactName?: string;
    primaryContactPhone?: string;
    primaryContactEmail?: string;
    commission?: number;
    inVenueLocationHierarchy1?: string;
    inVenueLocationHierarchy2?: string;
    inVenueLocationHierarchy3?: string;
    deliveryEnabled?: boolean;
    pickupEnabled?: boolean;
    deliveryFee?: number;
    pickupFee?: number;
    serviceFee?: number;
    liquorLicenseMessage?: string;
    alcoholLimitPerOrder?: number;
    alcoholLimitPerDay?: number;
    timezone: string;
    seatFields: string[];
    createdAt: Date;
    updatedAt: Date;
    vendorStands?: VendorStand[];
}

export function getVenueSeatField(venue: Venue) {
    let fields = [];
    let index = 1;
    if (!venue) {
        return fields;
    }
    while (true) {
        if (venue['inVenueLocationHierarchy' + index]) {
            fields.push(venue['inVenueLocationHierarchy' + index]);
            index++;
        } else {
            break;
        }
    }
    return fields;
}