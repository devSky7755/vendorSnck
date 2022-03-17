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
