import { MenuItemV1 } from "./menu_item";

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
    manager?: string;
    menuItems: MenuItemV1[];
}