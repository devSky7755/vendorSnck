import { ApiResponse } from "src/models/api_response";
import { BASE_URL, isVendorApp } from "src/models/constant";
import { Customer } from "src/models/customer";
import { MenuItem } from "src/models/menu_item";
import { Promo } from "src/models/promo";
import { Staff } from "src/models/staff";
import { VendorStand } from "src/models/vendorStand";
import { Venue, VenueDistributionArea, VenueInLocation } from "src/models/venue";

const VerifyEndPoint = isVendorApp ? 'auth/staff/verification-code' : 'auth/admin/verification-code';
const AuthEndPoint = isVendorApp ? 'auth/staff/login' : 'auth/admin/login';
const VenuesEndpoint = 'venues/';
const PromosEndpoint = 'promos/';
const VendorStandEndpoint = 'vendorStands/';
const StaffsEndpoint = 'staffs/';
const CustomersEndpoint = 'customers/';


///Authentication
export function postAuthentication(phone: string): Promise<ApiResponse> {
    return fetch(BASE_URL + VerifyEndPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNo: phone })
    }).then(res => res.json()).then(res => {
        return res as ApiResponse;
    })
}

export function postLogin(phone: string, code: string): Promise<ApiResponse> {
    return fetch(BASE_URL + AuthEndPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNo: phone, code: code })
    }).then(res => res.json()).then(res => {
        return res as ApiResponse;
    })
}

///Venues
export function getVenues(): Promise<Venue[]> {
    return fetch(BASE_URL + VenuesEndpoint).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data.venues as Venue[];
        } else {
            return [] as Venue[];
        }
    })
}

export function getVenue(id: string): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint + id).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return null;
        }
    })
}

export function patchVenue(token: string, venue: Venue, patch): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint + venue.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return venue;
        }
    })
}

export function postVenue(token: string, venue: Venue): Promise<Venue> {
    return fetch(BASE_URL + VenuesEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(venue)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Venue;
        } else {
            return null;
        }
    })
}

export function deleteVenue(token: string, id: string): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

///Vendor Stand
export function getVendorStands(token): Promise<VendorStand[]> {
    return fetch(BASE_URL + VendorStandEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.vendorStands as VendorStand[];
        } else {
            return null;
        }
    })
}

export function getVendorStand(id): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint + id).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return null;
        }
    })
}

export function patchVendorStand(token: string, vendor: VendorStand, patch): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint + vendor.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return vendor;
        }
    })
}

export function postVendorStand(token: string, vendor: VendorStand): Promise<VendorStand> {
    return fetch(BASE_URL + VendorStandEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vendor)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VendorStand;
        } else {
            return null;
        }
    })
}

export function deleteVendorStand(token: string, id: string): Promise<boolean> {
    return fetch(BASE_URL + VendorStandEndpoint + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

//Menu Items
export function patchMenuItem(token: string, vendorId: string, menu: MenuItem, patch): Promise<MenuItem> {
    return fetch(BASE_URL + VendorStandEndpoint + vendorId + '/menuItems/' + menu.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as MenuItem;
        } else {
            return menu;
        }
    })
}

export function postMenuItem(token: string, vendorId: string, menu: MenuItem): Promise<MenuItem> {
    return fetch(BASE_URL + VendorStandEndpoint + vendorId + '/menuItems', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(menu)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as MenuItem;
        } else {
            return null;
        }
    })
}

export function deleteMenuItem(token: string, menu: MenuItem): Promise<boolean> {
    return fetch(BASE_URL + VendorStandEndpoint + menu.vendorStandId + '/menuItems/' + menu.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

//Staffs
export function getAllStaffs(token: string): Promise<Staff[]> {
    return fetch(BASE_URL + StaffsEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(res => res.json()).then(res => {
        if (res.success && res.data && res.data.staffs) {
            return res.data.staffs as Staff[];
        } else {
            return [];
        }
    })
}

export function patchStaff(token: string, staff: Staff, patch): Promise<Staff> {
    return fetch(BASE_URL + StaffsEndpoint + staff.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Staff;
        } else {
            return staff;
        }
    })
}

export function postStaff(token: string, staff: Staff): Promise<Staff> {
    return fetch(BASE_URL + StaffsEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(staff)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Staff;
        } else {
            return null;
        }
    })
}

export function deleteStaff(token: string, staff: Staff): Promise<boolean> {
    return fetch(BASE_URL + StaffsEndpoint + staff.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

//Venue Distribution Area
export function getVenueDistributionAreas(token, venueId): Promise<VenueDistributionArea[]> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.distributionAreas as VenueDistributionArea[];
        } else {
            return null;
        }
    })
}

export function patchVenueDistributionArea(token: string, venueId: string, item: VenueDistributionArea, patch): Promise<VenueDistributionArea> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas/' + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueDistributionArea;
        } else {
            return item;
        }
    })
}

export function postVenueDistributionArea(token: string, venueId: string, item: VenueDistributionArea): Promise<VenueDistributionArea> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueDistributionArea;
        } else {
            return null;
        }
    })
}

export function deleteVenueDistributionArea(token: string, venueId: string, item: VenueDistributionArea): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/distributionAreas/' + item.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

//In Venue Loation
export function getVenueVenueInLocations(token, venueId): Promise<VenueInLocation[]> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.inVenueLocations as VenueInLocation[];
        } else {
            return null;
        }
    })
}

export function patchVenueInLocation(token: string, venueId: string, item: VenueInLocation, patch): Promise<VenueInLocation> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations/' + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueInLocation;
        } else {
            return item;
        }
    })
}

export function postVenueInLocation(token: string, venueId: string, item: VenueInLocation): Promise<VenueInLocation> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as VenueInLocation;
        } else {
            return null;
        }
    })
}

export function deleteVenueInLocation(token: string, venueId: string, item: VenueInLocation): Promise<boolean> {
    return fetch(BASE_URL + VenuesEndpoint + venueId + '/inVenueLocations/' + item.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

//Promo
export function getPromos(token): Promise<Promo[]> {
    return fetch(BASE_URL + PromosEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.promos as Promo[];
        } else {
            return null;
        }
    })
}

export function patchPromo(token: string, item: Promo, patch): Promise<Promo> {
    return fetch(BASE_URL + PromosEndpoint + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Promo;
        } else {
            return null;
        }
    })
}

export function postPromo(token: string, item: Promo): Promise<Promo> {
    return fetch(BASE_URL + PromosEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Promo;
        } else {
            return null;
        }
    })
}

export function deletePromo(token: string, item: Promo): Promise<boolean> {
    return fetch(BASE_URL + PromosEndpoint + item.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}

//Customer
export function getCustomers(token): Promise<Customer[]> {
    return fetch(BASE_URL + CustomersEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success && res.data) {
            return res.data.customers as Customer[];
        } else {
            return null;
        }
    })
}

export function patchCustomer(token: string, item: Customer, patch): Promise<Customer> {
    return fetch(BASE_URL + CustomersEndpoint + item.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(patch)
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return res.data as Customer;
        } else {
            return null;
        }
    })
}

export function deleteCustomer(token: string, item: Customer): Promise<boolean> {
    return fetch(BASE_URL + CustomersEndpoint + item.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(res => {
        if (res.success) {
            return true;
        } else {
            return false;
        }
    })
}
