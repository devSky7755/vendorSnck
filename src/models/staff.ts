export type UserRole = 'Admin' | 'Runner' | 'Packer';

export interface Staff {
  id: string;
  role: UserRole;
  email?: string;
  mobileNo?: string;
  firstName: string;
  lastName: string;
  active: boolean;
  lastSeen: string;
  lastSeenTimeStamp: number;

  vendorStandId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  average?: number;
  average_change?: number;
  daily_count?: number;
}


export const tempUsers: Staff[] = [
  {
    id: '52',
    role: 'Runner',
    firstName: 'Jack',
    lastName: 'Jackson',
    active: true,
    lastSeen: '15 min ago',
    lastSeenTimeStamp: 0,
  },
  {
    id: '51',
    role: 'Runner',
    firstName: 'Dave',
    lastName: 'Davidson',
    active: false,
    lastSeen: '5 days ago',
    lastSeenTimeStamp: 0
  },
  {
    id: '31',
    role: 'Packer',
    firstName: 'Frank',
    lastName: 'Frankson',
    active: true,
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0
  },
];