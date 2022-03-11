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
  tags?: string[]
}
