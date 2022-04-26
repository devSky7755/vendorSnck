import { ReactNode } from 'react';
import { isVendorApp } from 'src/models/constant';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const vendorMenuItems: MenuItems[] = [
  {
    heading: 'Orders',
    items: [
      {
        name: 'New',
        link: '/orders/items/new',
      },
      {
        name: 'Preparing',
        link: '/orders/items/preparing',
        badge: "3"
      },
      {
        name: 'Delivery',
        link: '/orders/items/delivery',
        badge: "2"
      },
      {
        name: 'Pickup',
        link: '/orders/items/pickup',
      },
      {
        name: 'All',
        link: '/orders/items/all',
      }
    ]
  },
  {
    heading: 'Location Settings',
    items: [
      {
        name: 'Order Settings',
        link: '/settings/orders'
      },
      {
        name: 'Menu Items',
        link: '/settings/menus'
      },
      {
        name: 'Staff',
        link: '/settings/staff'
      },
      {
        name: 'Printers',
        link: '/settings/printers'
      },
    ]
  },
  {
    heading: 'User Profile',
    items: [
      {
        name: 'User Profile',
        link: '/profile',
      },
      {
        name: 'Logout',
        link: '/logout',
      },
    ]
  }
];

const adminMenuItems: MenuItems[] = [
  {
    heading: 'Client Management',
    items: [
      {
        name: 'Venues',
        link: '/venues',
      },
      {
        name: 'Vendor Stands',
        link: '/vendorstands',
      },
      {
        name: 'Menu Items',
        link: '/menuitems',
      },
      {
        name: 'Staff',
        link: '/staff',
      },
    ]
  },
  {
    heading: 'Customer Management',
    items: [
      {
        name: 'Customers',
        link: '/customers',
      },
      {
        name: 'Orders',
        link: '/orders',
      },
      {
        name: 'Promos',
        link: '/promos',
      },
    ]
  },
  {
    heading: 'Admin',
    items: [
      {
        name: 'Dashboard',
        link: '/dashboards',
      },
      {
        name: 'Logout',
        link: '/logout',
      },
    ]
  }
];

const menuItems = (isVendorApp ? vendorMenuItems : adminMenuItems);

export default menuItems;