export type StaffRole = 'admin' | 'manager' | 'runner' | 'packer';

export interface IDName {
  id: string;
  name: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  mobileNo?: string;
  vendorStandId?: string;
  active?: boolean;
  role?: StaffRole;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  vendor_stand?: IDName;

  email?: string;
  lastSeen?: string;
  lastSeenTimeStamp?: number;
  average?: number;
  average_change?: number;
  daily_count?: number;
}

export function GetStaffRoleLabel(role) {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'manager':
      return 'Vendor Manager';
    case 'packer':
      return 'Packer';
    case 'runner':
      return 'Runner';
  }
  return role;
}


export const tempStaffs: Staff[] = [
  {
    id: '52',
    role: 'runner',
    firstName: 'Jack',
    lastName: 'Jackson',
    active: true,
    lastSeen: '15 min ago',
    lastSeenTimeStamp: 0,
  },
  {
    id: '51',
    role: 'runner',
    firstName: 'Dave',
    lastName: 'Davidson',
    active: false,
    lastSeen: '5 days ago',
    lastSeenTimeStamp: 0
  },
  {
    id: '31',
    role: 'packer',
    firstName: 'Frank',
    lastName: 'Frankson',
    active: true,
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0
  },
];