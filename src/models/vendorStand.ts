import { MenuItem } from "./menu_item";
import { Staff } from "./staff";
import { Venue } from "./venue";

export interface VendorStand {
    id: string;
    name: string;
    venueId: string;
    location?: string;
    coverImageUrl: string;
    coverImageThumbnailUrl: string;
    available?: boolean;
    deliveryAvailable: boolean;
    pickupAvailable: boolean;
    orderCapacity: number;
    pickupQueueCapacity: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    manager?: string;
    menuItems: MenuItem[];
    staffs: Staff[];

    venue?: Venue;
}