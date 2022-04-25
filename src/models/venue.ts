import { IDName } from "./staff";
import { VendorStand } from "./vendorStand";

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
    deletedAt?: Date;
    vendorStands?: VendorStand[];
}

export interface VenueInLocation {
    id: string;
    hierarchy1: string;
    hierarchy2?: string;
    hierarchy3?: string;
    distributionAreaId: string;
    distribution_area?: IDName;
    qrCode?: string;
    active?: boolean;
    deliveryEnabled?: boolean;
    pickupEnabled?: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface VenueDistributionArea {
    id?: string;
    venueId?: string;
    name?: string;
    active?: boolean;
    delivery?: boolean;
    pickup?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export function getVenueSeatField(venue: Venue) {
    let fields = [];
    let index = 1;
    if (!venue) {
        return fields;
    }
    while (true) {
        if (venue['inVenueLocationHierarchy' + index] !== null && venue['inVenueLocationHierarchy' + index] !== undefined) {
            fields.push(venue['inVenueLocationHierarchy' + index]);
            index++;
        } else {
            break;
        }
    }
    return fields;
}