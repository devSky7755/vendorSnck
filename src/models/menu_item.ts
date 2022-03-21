export type MenuItemStatus = 'Available' | 'Not Available';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  status: MenuItemStatus;
  currentAvailable: number;
  description?: string;
  addons?: string[],
  tags?: string[],
  isAlchol?: boolean
}

export const tempMenus: MenuItem[] = [
  {
    id: 0,
    name: 'Soda',
    category: 'Soft Drinks',
    status: 'Available',
    price: 2,
    currentAvailable: 100
  },
  {
    id: 1,
    name: 'Orange Juice',
    category: 'Soft Drinks',
    status: 'Not Available',
    price: 5,
    currentAvailable: 0
  },
  {
    id: 2,
    name: 'Beef Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 3,
    currentAvailable: 100,
    isAlchol: true
  },
  {
    id: 3,
    name: 'Vegan Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 4,
    currentAvailable: 100
  },
  {
    id: 4,
    name: 'NY Style Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 5,
    currentAvailable: 100
  }
];