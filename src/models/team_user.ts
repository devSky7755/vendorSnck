export type TeamUserStatus = 'Active' | 'Not Active';
export type UserRole = 'Admin' | 'Runner' | 'Packer';

export interface TeamUser {
  id: number;
  role: UserRole;
  email?: string;
  phone?: string;
  name: string;
  surname: string;
  status: TeamUserStatus;
  lastSeen: string;
  lastSeenTimeStamp: number;

  average?: number;
  average_change?: number;
  daily_count?: number;
}


export const tempUsers: TeamUser[] = [
  {
    id: 52,
    role: 'Runner',
    name: 'Jack',
    surname: 'Jackson',
    status: 'Active',
    lastSeen: '15 min ago',
    lastSeenTimeStamp: 0,
  },
  {
    id: 51,
    role: 'Runner',
    name: 'Dave',
    surname: 'Davidson',
    status: 'Not Active',
    lastSeen: '5 days ago',
    lastSeenTimeStamp: 0
  },
  {
    id: 31,
    role: 'Packer',
    name: 'Frank',
    surname: 'Frankson',
    status: 'Active',
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0
  },
];