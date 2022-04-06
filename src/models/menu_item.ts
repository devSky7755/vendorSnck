export type MenuItemStatus = 'Available' | 'Not Available';

export interface MenuItemV1 {
  id: string;
  name: string;
  description: string;
  imageUrl?: any;
  imageThumbnailUrl?: any;
  price: number;
  available: boolean;
  vendorStandId: string;
  containsAlcohol: boolean;
  orderPrecedence: number;
  mostPopular: boolean;
  suggestedMenuItemIds: any[];
  createdAt: Date;
  updatedAt: Date;
  menuItemCategoryId?: any;
}

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
  isAlchol?: boolean,
  count?: number
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
    addons: ['Napkins', 'Ketchup'],
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