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

const menuItems: MenuItems[] = [
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
        badge: "2"
      },
      {
        name: 'Delivery',
        link: '/orders/delivery',
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

export default menuItems;
