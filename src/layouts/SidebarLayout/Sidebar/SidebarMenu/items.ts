import { ReactNode } from 'react';

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
        link: '/orders/new',
      },
      {
        name: 'Preparing',
        link: '/orders/preparing',
        badge: "3"
      },
      {
        name: 'Delivery',
        link: '/orders/delivery',
        badge: "2"
      },
      {
        name: 'Pickup',
        link: '/orders/pickup',
      },
      {
        name: 'All',
        link: '/orders/all',
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
        name: 'Users',
        link: '/settings/users'
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
        link: '/vendorStands',
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
    heading: 'Admin Profile',
    items: [
      {
        name: 'Admin Profile',
        link: '/profile',
      },
      {
        name: 'Logout',
        link: '/logout',
      },
    ]
  }
];

const appType = 'vendor';
const menuItems = (appType === 'vendor' ? vendorMenuItems : adminMenuItems);

export default menuItems;